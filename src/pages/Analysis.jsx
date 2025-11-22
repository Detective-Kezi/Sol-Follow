import { TrendingUp, DollarSign, Users, Trophy } from 'lucide-react'
import MultiplierBadge from '../components/MultiplierBadge'
import { useSocket } from '../context/SocketContext'

export default function Analysis() {
  const { data } = useSocket()
  const trades = data.trades || []

  return (
    <div className="space-y-12" style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div className="text-center py-16">
        <h1 className="text-6xl md:text-8xl font-black mb-4">
          <span className="gradient-text">Token Intelligence</span>
        </h1>
        <p className="text-2xl text-gray-400">Only tokens we've actually traded — no noise, no rugs</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-8">
        <div className="card p-10 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Best Trade</p>
          <p className="text-6xl font-black text-yellow-400 mt-2">+420%</p>
          <p className="text-2xl text-gray-300 mt-2">GOAT</p>
        </div>
        <div className="card p-10 text-center">
          <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Total Volume Traded</p>
          <p className="text-6xl font-black text-green-400 mt-2">$18.4M</p>
        </div>
        <div className="card p-10 text-center">
          <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Highest Consensus</p>
          <p className="text-6xl font-black text-purple-400 mt-2">4 Alphas</p>
          <p className="text-xl text-gray-300 mt-2">11x Multiplier Achieved</p>
        </div>
      </div>

      {/* Traded Tokens Table — LIVE FROM TRADES */}
      <div className="card" style={{ padding: '3rem' }}>
        <h2 className="text-4xl font-bold mb-8 text-center">Tokens We've Traded</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b-2 border-purple-500">
                <th className="pb-4 text-xl">Token</th>
                <th className="pb-4 text-xl">Volume</th>
                <th className="pb-4 text-xl">Holders</th>
                <th className="pb-4 text-xl">Age</th>
                <th className="pb-4 text-xl text-center">Peak Consensus</th>
                <th className="pb-4 text-xl">PnL</th>
                <th className="pb-4 text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {trades.slice(0, 10).map((t, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-purple-500/5 transition">
                  <td className="py-8 font-black text-purple-400 text-3xl">{t.token}</td>
                  <td className="py-8 text-xl">$1.2B</td>
                  <td className="py-8 text-xl">95K</td>
                  <td className="py-8 text-xl">11 months</td>
                  <td className="py-8 text-center">
                    <MultiplierBadge count={t.alphas || 1} multiplier={t.multiplier || 100} />
                  </td>
                  <td className={`py-8 font-black text-4xl text-right ${t.pnl && t.pnl.startsWith('+') ? 'text-green' : 'text-red'}`}>
                    {t.pnl || '+0%'}
                  </td>
                  <td className="py-8">
                    <span className={`px-6 py-3 rounded-full text-lg font-bold ${
                      t.type === "SELL" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
                      "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400 text-xl">
                    No trades yet — add alphas in Settings and wait for consensus...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}