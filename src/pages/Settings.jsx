import { useState, useEffect } from 'react'
import { Copy, Plus, Trash2, Wallet, Zap } from 'lucide-react'
import { useSocket } from '../context/SocketContext'

export default function Settings() {
  const [wallets, setWallets] = useState([])
  const [newWallet, setNewWallet] = useState('')
  const [buyAmount, setBuyAmount] = useState(0.5)
  const [slippage, setSlippage] = useState(15)
  const { data, socket } = useSocket()

  useEffect(() => {
    if (data.watched) setWallets(data.watched)
    if (data.settings) {
      setBuyAmount(data.settings.buyAmount || 0.5)
      setSlippage(data.settings.slippage || 15)
    }
  }, [data])

  const addWallet = () => {
    if (newWallet.trim().length >= 32) {
      const fullAddr = newWallet.trim()
      const shortAddr = fullAddr.slice(0,8) + "..." + fullAddr.slice(-4)
      const newWallets = [...wallets, fullAddr]
      setWallets(newWallets)
      setNewWallet('')
      if (socket) socket.emit('addWallet', fullAddr)
    }
  }

  const removeWallet = (index) => {
    const newWallets = wallets.filter((_, i) => i !== index)
    setWallets(newWallets)
    if (socket) socket.emit('updateWatched', newWallets)
  }

  const saveSettings = () => {
    if (socket) socket.emit('updateSettings', { buyAmount, slippage })
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
        <div className="card" style={{ padding: '4rem' }}>
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
            <Zap className="w-12 h-12 text-purple-400" />
            Trade Engine
          </h2>
          <div className="space-y-8">
            <div>
              <label className="block text-xl mb-3">Buy Amount (SOL)</label>
              <input 
                type="number" 
                value={buyAmount} 
                onChange={(e) => setBuyAmount(parseFloat(e.target.value))} 
                className="w-full px-6 py-5 bg-gray-900/50 border border-purple-500/30 rounded-2xl text-2xl focus:border-purple-400 outline-none transition" 
              />
            </div>
            <div>
              <label className="block text-xl mb-3">Max Slippage (%)</label>
              <input 
                type="number" 
                value={slippage} 
                onChange={(e) => setSlippage(parseInt(e.target.value))} 
                className="w-full px-6 py-5 bg-gray-900/50 border border-purple-500/30 rounded-2xl text-2xl focus:border-purple-400 outline-none" 
              />
            </div>
            <div className="pt-8">
              <button onClick={saveSettings} className="btn-primary w-full text-2xl" style={{ padding: '1.5rem' }}>
                SAVE SETTINGS
              </button>
            </div>
          </div>
        </div>

        {/* Watched Wallets */}
        <div className="card" style={{ padding: '4rem' }}>
          <h2 className="text-4xl font-bold mb-10">Alpha Wallets ({wallets.length})</h2>
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWallet()}
              placeholder="Paste Solana address..."
              className="flex-1 px-6 py-5 bg-gray-900/50 rounded-2xl border border-purple-500/30 focus:border-purple-400 outline-none text-xl"
            />
            <button onClick={addWallet} className="px-8 py-5 bg-purple-600 rounded-2xl hover:bg-purple-500 transition">
              <Plus className="w-8 h-8" />
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {wallets.map((w, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between">
                <code className="text-xl text-purple-300 font-mono">{w.slice(0,8) + "..." + w.slice(-4)}</code>
                <button onClick={() => removeWallet(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}