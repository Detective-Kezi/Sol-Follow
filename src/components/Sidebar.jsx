import { NavLink } from 'react-router-dom'
import { Home, Settings, BarChart3, Crown } from 'lucide-react'

const links = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/analysis", icon: BarChart3, label: "Token Analysis" },
  { to: "/hunter", icon: Crown, label: "Golden Alphas" }
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-72 glass h-screen fixed left-0 top-20 pt-10 border-r border-purple-500/20">
      <nav className="px-8 space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-300 font-bold text-lg
              ${isActive 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <link.icon className="w-7 h-7" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-10 left-8 right-8">
        <div className="glass p-6 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-4">
            <Crown className="w-10 h-10 text-purple-400 animate-pulse" />
            <div>
              <p className="text-sm text-gray-400">Engine Status</p>
              <p className="text-xl font-bold text-purple-400">GOLDEN ALPHA MODE</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}