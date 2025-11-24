import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [data, setData] = useState({
    trades: [],
    settings: {},
    positions: [],
    watched: [],
    goldenAlphas: [],
    totalProfit: 0
  })

  useEffect(() => {
    // FINAL: Always use HTTPS on Railway, fallback to localhost
    const raw = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"
    const BACKEND_URL = raw.startsWith('http') ? raw.replace('http://', 'https://') : `https://${raw}`

    console.log('Connecting to backend →', BACKEND_URL)

    const newSocket = io(BACKEND_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000
    })

    newSocket.on('connect', () => {
      console.log('SOCKET GREEN — CONNECTED TO BACKEND')
    })

    newSocket.on('connect_error', (err) => {
      console.error('Socket failed:', err.message)
    })

    newSocket.on('init', (d) => setData(d))
    newSocket.on('newTrade', (t) => setData(prev => ({ ...prev, trades: [t, ...prev.trades.slice(0,49)] })))
    newSocket.on('sold', (s) => setData(prev => ({ ...prev, trades: [s, ...prev.trades] })))
    newSocket.on('positionsUpdate', (p) => setData(prev => ({ ...prev, positions: p })))
    newSocket.on('goldenAlphasUpdate', (a) => setData(prev => ({ ...prev, goldenAlphas: a })))

    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={{ socket, data, setData }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}