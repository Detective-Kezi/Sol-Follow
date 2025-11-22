import { useSocket } from '../context/SocketContext'
import TradeCard from '../components/TradeCard'
import MultiplierBadge from '../components/MultiplierBadge'
import { TrendingUp, Wallet, Zap, Shield } from 'lucide-react'

export default function Dashboard() {
  const { data } = useSocket()
  const { trades = [], positions = [], totalProfit = 0, watched = [] } = data

  // Calculate Win Rate dynamically
  const totalTrades = trades.length
  const wins = trades.filter(t => t.pnl && t.pnl.startsWith('+')).length
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0

  return (
    <div className="space-y-12 max-w-7xl mx-auto" style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div className="text-center" style={{ padding: '6rem 0' }}>
        <h1 className="text-huge gradient-text">SolFollow</h1>
        <p className="text-big" style={{ marginTop: '1rem', color: '#94a3b8' }}>
          Alpha Consensus Multiplier Engine
        </p>
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.5)', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>LIVE & ARMED</span>
          </div>
        </div>
      </div>

      {/* Stats (100% dynamic) */}
      <div className="grid grid-cols-4 gap-8">
        <div className="card text-center">
          <TrendingUp size={60} className="text-green mx-auto mb-4" />
          <p className="text-gray-400">Total PnL</p>
          <p className="text-huge text-green" style={{ marginTop: '0.5rem' }}>
            {totalProfit > 0 ? `+${totalProfit.toFixed(2)} SOL` : '0 SOL'}
          </p>
        </div>
        <div className="card text-center">
          <Zap size={60} className="text-purple mx-auto mb-4" />
          <p className="text-gray-400">Win Rate</p>
          <p className="text-huge text-purple" style={{ marginTop: '0.5rem' }}>
            {winRate}% ({wins}/{totalTrades})
          </p>
        </div>
        <div className="card text-center">
          <Wallet size={60} className="text-purple mx-auto mb-4" />
          <p className="text-gray-400">Alphas Watched</p>
          <p className="text-huge text-purple" style={{ marginTop: '0.5rem' }}>{watched.length}</p>
        </div>
        <div className="card text-center">
          <Shield size={60} className="text-red mx-auto mb-4" />
          <p className="text-gray-400">Live Positions</p>
          <p className="text-huge text-red" style={{ marginTop: '0.5rem' }}>{positions.length}</p>
        </div>
      </div>

      {/* Live Positions — NOW WITH REAL PRICE & PnL */}
      <div>
        <h2 className="text-4xl font-bold mb-8 text-center">Live Positions</h2>
        <div className="card">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-4">Token</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Avg Buy</th>
                <th className="pb-4">Current</th>
                <th className="pb-4">PnL %</th>
                <th className="pb-4">PnL SOL</th>
                <th className="text-right pb-4">Consensus</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, i) => {
                const pnlColor = pos.pnlPct >= 0 ? 'text-green-400' : 'text-red-400';
                const pnlPrefix = pos.pnlPct >= 0 ? '+' : '';

                return (
                  <tr key={i} className="border-b border-gray-800 hover:bg-white/5 transition">
                    <td className="py-6 font-bold text-purple-400">{pos.token || pos.mint.slice(0, 8)}</td>
                    <td>{pos.amount?.toFixed(2)}</td>
                    <td>${pos.avgBuyPrice?.toFixed(6)}</td>
                    <td className="text-yellow-400 font-bold">
                      ${pos.currentPrice?.toFixed(6) || '-.--'}
                    </td>
                    <td className={`font-black text-2xl ${pnlColor}`}>
                      {pos.pnlPct ? `${pnlPrefix}${pos.pnlPct.toFixed(1)}%` : '-'}
                    </td>
                    <td className={`font-bold text-xl ${pnlColor}`}>
                      {pos.pnlSol ? `${pnlPrefix}${pos.pnlSol.toFixed(3)} SOL` : '-'}
                    </td>
                    <td className="text-right">
                      <MultiplierBadge count={pos.alphaCount || 1} multiplier={pos.targetMultiplier || 100} />
                    </td>
                  </tr>
                );
              })}
              {positions.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400 text-xl">
                    No live positions — waiting for alpha consensus...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Trades */}
      <div>
        <h2 className="text-4xl font-bold mb-8 text-center">Recent Trades</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {trades.map((trade, i) => (
            <TradeCard key={i} trade={trade} />
          ))}
          {trades.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-400">No trades yet — add alphas in Settings and wait for consensus...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}