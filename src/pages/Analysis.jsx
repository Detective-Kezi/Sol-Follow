// frontend/src/pages/Analysis.jsx — FINAL v12 (HTTP + AXIOS)
import { useState, useEffect } from 'react'
import API from '../api'
import MultiplierBadge from '../components/MultiplierBadge'
import { TrendingUp, DollarSign, Users, Trophy } from 'lucide-react'

export default function Analysis() {
  const [data, setData] = useState({
    trades: [],
    totalProfit: 0,
    watched: []
  })

  const loadData = async () => {
    try {
      const res = await API.get('/api/data')
      setData(res.data)
    } catch (err) {
      console.error("Failed to load analysis data:", err.message)
    }
  }

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 10000)
    return () => clearInterval(interval)
  }, [])

  const { trades = [], totalProfit = 0 } = data

  // Real stats
  const totalTrades = trades.length
  const wins = trades.filter(t => t.type === "SELL").length
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0
  const highestConsensus = Math.max(...trades.map(t => t.alphas || 0), 0)
  const bestTrade = trades.reduce((max, t) => 
    (t.pnl && parseFloat(t.pnl) > (max.pnl || 0)) ? t : max, {}
  )

  return (
    <div className="space-y-12" style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div className="text-center py-16">
        <h1 className="text-6xl md:text-8xl font-black mb-4">
          <span className="gradient-text">Token Intelligence</span>
        </h1>
        <p className="text-2xl text-gray-400">Only tokens we've actually traded — no noise, no rugs</p>
      </div>

      {/* Real Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-10 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Best Trade</p>
          <p className="text-6xl font-black text-yellow-400 mt-2">
            {bestTrade.pnl ? bestTrade.pnl : '-'}
          </p>
          <p className="text-2xl text-gray-300 mt-2">
            {bestTrade.token ? bestTrade.token : 'None yet'}
          </p>
        </div>

        <div className="card p-10 text-center">
          <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Total Profit</p>
          <p className="text-6xl font-black text-green-400 mt-2">
            {totalProfit > 0 ? `+${totalProfit.toFixed(2)} SOL` : '0 SOL'}
          </p>
        </div>

        <div className="card p-10 text-center">
          <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Highest Consensus</p>
          <p className="text-6xl font-black text-purple-400 mt-2">
            {highestConsensus > 0 ? highestConsensus : '0'}
          </p>
          <p className="text-xl text-gray-300 mt-2">
            {highestConsensus > 0 ? `${MULTIPLIER_TABLE[highestConsensus] || 5500}% TP` : 'Waiting...'}
          </p>
        </div>
      </div>

      {/* Traded Tokens Table — 100% REAL */}
      <div className="card p-10">
        <h2 className="text-4xl font-bold mb-8 text-center">Tokens We've Traded</h2>
        {trades.length === 0 ? (
          <p className="text-center text-2xl text-gray-400 py-20">
            No trades yet — add alphas and moonshots to begin
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b-2 border-purple-500">
                  <th className="pb-4 text-xl">Token</th>
                  <th className="pb-4 text-xl">Type</th>
                  <th className="pb-4 text-xl text-center">Consensus</th>
                  <th className="pb-4 text-xl">Size (SOL)</th>
                  <th className="pb-4 text-xl">PnL</th>
                  <th className="pb-4 text-xl">Time</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-purple-500/5 transition">
                    <td className="py-6 font-black text-purple-400 text-2xl">{t.token}</td>
                    <td className="py-6">
                      <span className={`px-6 py-3 rounded-full text-lg font-bold ${t.type === "BUY" ? "bg-purple-500/20 text-purple-400" : "bg-green-500/20 text-green-400"} border`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-6 text-center">
                      {t.alphas && <MultiplierBadge count={t.alphas} multiplier={t.multiplier || 100} />}
                    </td>
                    <td className="py-6 text-xl">{t.amount?.toFixed(2) || '-'}</td>
                    <td className={`py-6 font-black text-2xl ${t.pnl?.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {t.pnl || '-'}
                    </td>
                    <td className="py-6 text-gray-400">
                      {new Date(t.time).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}