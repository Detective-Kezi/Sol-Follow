import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Analysis from './pages/Analysis'
import AlphaHunter from './pages/AlphaHunter'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0d1e]">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/hunter" element={<AlphaHunter />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App