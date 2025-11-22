import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="glass border-b border-purple-500/20 px-6 py-5 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-black">
            <span className="gradient-text">Sol</span>
            <span className="text-white">Follow</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-green-500/20 px-5 py-2 rounded-full border border-green-500/50">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-purple-500/20 px-6 py-3 rounded-full border border-purple-500/50">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-bold">Consensus Engine Active</span>
          </div>
        </div>
      </div>
    </nav>
  )
}