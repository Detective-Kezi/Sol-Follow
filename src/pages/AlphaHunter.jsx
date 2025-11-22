import { Crown, Zap, Target, Flame, TrendingUp, Plus } from 'lucide-react'
import { useSocket } from '../context/SocketContext'

export default function AlphaHunter() {
  const { data } = useSocket()
  const goldenAlphas = data.goldenAlphas || []

  const getCrown = (score) => {
    if (score >= 9.5) return "text-yellow-400 drop-shadow-glow"
    if (score >= 9.0) return "text-gray-300"
    if (score >= 8.5) return "text-orange-600"
    return "text-gray-500"
  }

  return (
    <div className="space-y-12" style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div className="text-center py-16">
        <div className="flex justify-center gap-6 mb-8">
          <Flame className="w-20 h-20 text-orange-500 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black">
            <span className="gradient-text">Golden Alpha</span>
          </h1>
          <Flame className="w-20 h-20 text-orange-500 animate-pulse" />
        </div>
        <p className="text-3xl text-gray-300 font-light">The true pump.fun gods — ranked by real performance</p>
        <p className="text-xl text-gray-500 mt-4">Early. Fast. Winning. Only the best.</p>
      </div>

      {/* Leaderboard */}
      <div className="card" style={{ padding: '4rem' }}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black">Golden Leaderboard</h2>
          <div className="flex items-center gap-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">Live Updated</span>
          </div>
        </div>

        <div className="space-y-6">
          {goldenAlphas.map((alpha, i) => (
            <div key={i} className="glass p-8 rounded-3xl hover:border-purple-500 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="text-6xl font-black text-gray-600">#{i + 1}</div>
                  <Crown className={`w-16 h-16 ${getCrown(alpha.score)}`} />
                  <div>
                    <code className="text-3xl font-mono text-purple-400">{alpha.address}</code>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <p className="text-gray-400">Avg Buy Position</p>
                        <p className="text-3xl font-black text-green-400">{alpha.avgPosition}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Win Rate</p>
                        <p className="text-3xl font-black text-green-400">{alpha.winRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Jito Bundle Rate</p>
                        <p className="text-3xl font-black text-cyan-400">{alpha.jitoRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">24h Volume</p>
                        <p className="text-3xl font-black text-yellow-400">{alpha.volume24h}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 mb-2">Golden Score</p>
                  <p className="text-8xl font-black text-yellow-400 drop-shadow-glow">{alpha.score}</p>
                  <button className="mt-6 px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-black hover:opacity-90 transition flex items-center gap-4 mx-auto">
                    <Plus className="w-10 h-10" />
                    COPY THIS GOD
                  </button>
                </div>
              </div>
            </div>
          ))}
          {goldenAlphas.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No golden alphas yet — monitoring pump.fun launches...</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">
          Powered by pump.fun first-buys + Jito bundle dominance<br/>
          Only the real alphas make the cut
        </p>
      </div>
    </div>
  )
}