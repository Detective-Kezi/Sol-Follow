// frontend/src/pages/Settings.jsx — FINAL v12 (HTTP + AXIOS)
import { useState, useEffect } from 'react'
import { Copy, Plus, Trash2, Wallet, Zap } from 'lucide-react'
import API from '../api'

export default function Settings() {
  const [wallets, setWallets] = useState([])
  const [newWallet, setNewWallet] = useState('')
  const [buyAmount, setBuyAmount] = useState(0.5)
  const [slippage, setSlippage] = useState(15)
  const [loading, setLoading] = useState(false)

  // Load initial data
  const loadData = async () => {
    try {
      const res = await API.get('/api/data')
      setWallets(res.data.watched || [])
      setBuyAmount(res.data.settings?.buyAmount || 0.5)
      setSlippage(res.data.settings?.slippage || 15)
    } catch (err) {
      console.error("Failed to load settings:", err.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

const addWallet = async () => {
  if (!newWallet.trim() || newWallet.length < 32) return alert("Invalid wallet");
  try {
    await API.post('/api/wallet', { wallet: newWallet.trim(), action: "add" });
    setWallets([...wallets, newWallet.trim()]);
    setNewWallet('');
    alert("Wallet added + Helius synced!");
  } catch (err) {
    alert("Failed to add wallet");
  }
};

const removeWallet = async (walletToRemove) => {
  try {
    await API.post('/api/wallet', { wallet: walletToRemove, action: "remove" });
    setWallets(wallets.filter(w => w !== walletToRemove));
    alert("Wallet removed + Helius synced!");
  } catch (err) {
    alert("Failed to remove wallet");
  }};

  // Save settings
  const saveSettings = async () => {
    setLoading(true)
    try {
      await API.post('/api/settings', { buyAmount: Number(buyAmount), slippage: Number(slippage) })
      alert("Settings saved!")
    } catch (err) {
      alert("Failed to save settings")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto" style={{ paddingTop: '100px' }}>
      <div className="text-center py-16">
        <h1 className="text-6xl md:text-8xl font-black mb-4">
          <span className="gradient-text">Bot Controls</span>
        </h1>
        <p className="text-2xl text-gray-400">Configure your money printer</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Trade Settings */}
        <div className="card p-10">
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
            <Zap className="w-12 h-12 text-purple-400" />
            Trade Engine
          </h2>
          <div className="space-y-8">
            <div>
              <label className="block text-xl mb-3 text-gray-300">Buy Amount (SOL)</label>
              <input 
                type="number"
                step="0.1"
                min="0.1"
                max="10"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="w-full px-6 py-5 bg-gray-900/50 border border-purple-500/30 rounded-2xl text-2xl focus:border-purple-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xl mb-3 text-gray-300">Max Slippage (%)</label>
              <input 
                type="number"
                step="1"
                min="1"
                max="50"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-full px-6 py-5 bg-gray-900/50 border border-purple-500/30 rounded-2xl text-2xl focus:border-purple-400 outline-none transition"
              />
            </div>
            <button 
              onClick={saveSettings}
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-black hover:scale-105 transition disabled:opacity-70"
            >
              {loading ? "Saving..." : "SAVE SETTINGS"}
            </button>
          </div>
        </div>

        {/* Watched Wallets */}
        <div className="card p-10">
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
            <Wallet className="w-12 h-12 text-purple-400" />
            Alpha Wallets ({wallets.length})
          </h2>
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWallet()}
              placeholder="Paste Solana wallet address..."
              className="flex-1 px-6 py-5 bg-gray-900/50 rounded-2xl border border-purple-500/30 focus:border-purple-400 outline-none text-xl"
            />
            <button 
              onClick={addWallet}
              disabled={loading}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:scale-105 transition flex items-center gap-3 disabled:opacity-70"
            >
              <Plus className="w-8 h-8" />
              <span className="font-bold">ADD</span>
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {wallets.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No alpha wallets yet — add one above</p>
            ) : (
              wallets.map((wallet, i) => (
                <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between">
                  <code className="text-xl text-purple-300 font-mono">
                    {wallet.slice(0,8)}...{wallet.slice(-4)}
                  </code>
                  <button 
                    onClick={() => removeWallet(wallet)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
