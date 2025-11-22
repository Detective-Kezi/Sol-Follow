// src/context/SocketContext.jsx
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
    // THIS LINE IS THE KEY — uses Railway variable or falls back to local
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"
    
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      timeout: 10000
    })

    newSocket.on('connect', () => {
      console.log('SOCKET CONNECTED →', BACKEND_URL)
    })

    newSocket.on('connect_error', (err) => {
      console.error('Socket connect error:', err.message)
    })

    newSocket.on('init', (serverData) => {
      setData(serverData)
    })

    newSocket.on('newTrade', (trade) => {
      setData(prev => ({ ...prev, trades: [trade, ...prev.trades.slice(0,49)] }))
    })

    newSocket.on('sold', (sell) => {
      setData(prev => ({ ...prev, trades: [sell, ...prev.trades] }))
    })

    newSocket.on('positionsUpdate', (positions) => {
      setData(prev => ({ ...prev, positions }))
    })

    newSocket.on('goldenAlphasUpdate', (alphas) => {
      setData(prev => ({ ...prev, goldenAlphas: alphas }))
    })

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
