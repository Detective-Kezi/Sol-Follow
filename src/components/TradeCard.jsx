import MultiplierBadge from './MultiplierBadge'

export default function TradeCard({ trade }) {
  const isBuy = trade.type === "BUY"
  return (
    <div className="card p-8 hover-scale group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-3xl font-black text-purple-400">{trade.token}</h3>
          <p className="text-gray-400 mt-1">Copied from alpha wallet</p>
        </div>
        <div className={`text-5xl font-black ${isBuy ? 'text-green' : 'text-red'}`}>
          {trade.type}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Amount</span>
          <span className="font-bold">{trade.amount} tokens</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time</span>
          <span className="font-bold">{trade.time}</span>
        </div>
        {trade.multiplier && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Consensus Power</span>
            <MultiplierBadge count={trade.multiplier === 5500 ? 10 : trade.multiplier === 4500 ? 9 : trade.multiplier === 3600 ? 8 : trade.multiplier === 2800 ? 7 : trade.multiplier === 2100 ? 6 : trade.multiplier === 1500 ? 5 : trade.multiplier === 1000 ? 4 : trade.multiplier === 600 ? 3 : trade.multiplier === 300 ? 2 : 1} multiplier={trade.multiplier} />
          </div>
        )}
        <div className={`text-4xl font-black text-right mt-8 ${trade.pnl.startsWith('+') ? 'text-green' : 'text-red'}`}>
          {trade.pnl}
        </div>
      </div>
    </div>
  )
}