// frontend/src/pages/AlphaHunter.jsx — FINAL v12 (HTTP + AXIOS)
import { useState, useEffect } from 'react'
import API from '../api'
import { Plus, Search, Crown, Zap } from 'lucide-react'

export default function AlphaHunter() {
  const [ca, setCa] = useState('')
  const [alphas, setAlphas] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const addMoonshot = async () => {
    if (!ca || ca.length < 32) return alert("Invalid Contract Address")
    setLoading(true)
    setStatus('Adding CA and extracting alphas...')

    try {
      await API.post('/api/add-ca', { ca: ca.trim() })
      setCa('')
      setStatus('Success! Extracting early buyers...')
      setTimeout(() => setStatus(''), 5000)
    } catch (err) {
      setStatus('Failed to add CA')
      console.error(err)
    }
    setLoading(false)
  }

  const loadAlphas = async () => {
    try {
      const res = await API.get('/api/data')
      setAlphas(res.data.goldenAlphas || [])
    } catch (err) {
      console.error("Failed to load Golden Alphas:", err)
    }
  }

  useEffect(() => {
    loadAlphas()
    const interval = setInterval(loadAlphas, 12000) // refresh every 12s
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-12" style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div className="text-center py-16">
        <div className="flex justify-center items-center gap-6 mb-8">
          <Crown className="w-20 h-20 text-yellow-400 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black">
            <span className="gradient-text">Golden Alpha</span>
          </h1>
          <Crown className="w-20 h-20 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-3xl text-gray-300 font-light">Extracted from past 10x–100x tokens</p>
        <p className="text-xl text-gray-500 mt-4">Add any moonshot CA → reveal the real gods</p>
      </div>

      {/* CA Input */}
      <div className="max-w-4xl mx-auto">
        <div className="card p-10">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-4 justify-center">
            <Search className="w-12 h-12 text-purple-400" />
            Add Past Moonshot CA
          </h2>
          <div className="flex gap-6 max-w-3xl mx-auto">
            <input
              type="text"
              value={ca}
              onChange={(e) => setCa(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && addMoonshot()}
              placeholder="e.g. PumpFun 100x token address..."
              className="flex-1 px-8 py-6 bg-gray-900/50 rounded-3xl border border-purple-500/30 focus:border-purple-400 outline-none text-xl placeholder-gray-500"
            />
            <button
              onClick={addMoonshot}
              disabled={loading}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl hover:scale-105 transition font-black text-2xl flex items-center gap-4 disabled:opacity-70"
            >
              <Plus className="w-10 h-10" />
              EXTRACT ALPHAS
            </button>
          </div>
          {status && (
            <p className="text-center mt-6 text-xl text-purple-400 font-bold">{status}</p>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-6xl mx-auto">
        <div className="card p-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl font-black">Golden Alpha Leaderboard</h2>
            <div className="flex items-center gap-4">
              <Zap className="w-10 h-10 text-yellow-400 animate-pulse" />
              <span className="text-2xl font-bold text-yellow-400">LIVE RANKED</span>
            </div>
          </div>

          {alphas.length === 0 ? (
            <div className="text-center py-32">
              <Crown className="w-32 h-32 text-gray-700 mx-auto mb-8 opacity-50" />
              <p className="text-3xl text-gray-400">No Golden Alphas yet</p>
              <p className="text-xl text-gray-500 mt-4">Add a past moonshot CA above to begin the hunt</p>
            </div>
          ) : (
            <div className="space-y-8">
              {alphas.map((alpha, i) => (
                <div key={i} className="glass p-10 rounded-3xl hover:border-purple-500 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-10">
                      <div className="text-7xl font-black text-gray-600">#{i + 1}</div>
                      <Crown className={`w-20 h-20 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : 'text-orange-600'}`} />
                      <div>
                        <code className="text-4xl font-mono text-purple-400">{alpha.address}</code>
                        <div className="grid grid-cols-3 gap-12 mt-6 text-xl">
                          <div>
                            <p className="text-gray-400">Score</p>
                            <p className="text-4xl font-black text-yellow-400">{alpha.score}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Avg Position</p>
                            <p className="text-3xl font-bold text-green-400">{alpha.avgPosition}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Win Rate</p>
                            <p className="text-3xl font-bold text-green-400">{alpha.winRate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-6xl font-black text-yellow-400 drop-shadow-glow">{alpha.score}</p>
                      <button className="mt-6 px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-black hover:scale-105 transition">
                        COPY THIS GOD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}