import { useState } from 'react'
import { useSocket } from '../context/SocketContext'
import { Crown, Plus, Search, Trophy } from 'lucide-react'

export default function AlphaHunter() {
  const { data, socket } = useSocket()
  const [newCA, setNewCA] = useState('')

  const addMoonshot = () => {
    if (newCA.trim().length >= 32) {
      socket.emit('addMoonshotCA', newCA.trim())
      setNewCA('')
    }
  }

  const goldenAlphas = data.goldenAlphas || []

  return (
    <div className="space-y-12" style={{ paddingTop: '100px' }}>
      <div className="text-center py-16">
        <h1 className="text-6xl md:text-8xl font-black mb-4">
          <span className="gradient-text">Golden Alpha</span>
        </h1>
        <p className="text-2xl text-gray-400">Extracted from past 10x–100x tokens</p>
      </div>

      {/* INPUT BOX */}
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-4">
            <Search className="w-10 h-10" />
            Add Past Moonshot CA
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newCA}
              onChange={(e) => setNewCA(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMoonshot()}
              placeholder="Paste token CA (e.g. PumpFun 100x)"
              className="flex-1 px-6 py-5 bg-gray-900/50 rounded-2xl border border-purple-500/30 focus:border-purple-400 outline-none text-xl"
            />
            <button onClick={addMoonshot} className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:scale-105 transition flex items-center gap-3">
              <Plus className="w-8 h-8" />
              <span className="text-xl font-bold">EXTRACT ALPHAS</span>
            </button>
          </div>
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="card p-12">
        <h2 className="text-5xl font-black mb-12 text-center">Golden Alpha Leaderboard</h2>
        {goldenAlphas.length === 0 ? (
          <p className="text-center text-xl text-gray-400 py-20">
            Add a past moonshot CA above → watch the gods appear
          </p>
        ) : (
          <div className="space-y-6">
            {goldenAlphas.map((alpha, i) => (
              <div key={i} className="glass p-8 rounded-3xl hover:border-purple-500 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="text-6xl font-black text-gray-600">#{i+1}</div>
                    <Crown className="w-16 h-16 text-yellow-400" />
                    <code className="text-3xl font-mono text-purple-400">{alpha.address}</code>
                    <div className="grid grid-cols-3 gap-8 text-xl">
                      <div>Avg Position: <span className="text-green-400 font-bold">{alpha.avgPosition}</span></div>
                      <div>Win Rate: <span className="text-green-400 font-bold">{alpha.winRate}</span></div>
                      <div>Volume: <span className="text-yellow-400 font-bold">{alpha.volume24h}</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-8xl font-black text-yellow-400">{alpha.score}</p>
                    <p className="text-2xl text-gray-400">Golden Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}