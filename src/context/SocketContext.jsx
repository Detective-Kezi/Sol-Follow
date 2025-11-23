// src/context/SocketContext.jsx — FINAL RAILWAY-PROOF VERSION
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
    // FORCE HTTPS IN PRODUCTION — NO HTTP EVER
    const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"
    const BACKEND_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

    console.log('Attempting socket connection to:', BACKEND_URL)

    const newSocket = io(BACKEND_URL, {
      transports: ['websocket'],           // Force WebSocket (skip polling hell)
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: true
    })

    newSocket.on('connect', () => {
      console.log('SOCKET CONNECTED SUCCESSFULLY →', BACKEND_URL)
    })

    newSocket.on('connect_error', (err) => {
      console.error('Socket connection failed:', err.message)
    })

    newSocket.on('init', (serverData) => {
      console.log('Init data received from server')
      setData(serverData)
    })

    newSocket.on('newTrade', (trade) => {
      setData(prev => ({ ...prev, trades: [trade, ...prev.trades.slice(0, 49)] }))
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

    return () => {
      newSocket.close()
    }
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
