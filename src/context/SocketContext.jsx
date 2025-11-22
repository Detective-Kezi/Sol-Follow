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
    goldenAlphas: []
  })

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('connect', () => console.log('Connected to backend'))

    newSocket.on('init', (serverData) => {
      setData(serverData)
    })

    newSocket.on('newTrade', (trade) => {
      setData(prev => ({ ...prev, trades: [trade, ...prev.trades.slice(0, 49)] }))
    })

    newSocket.on('sold', (sell) => {
      setData(prev => ({ ...prev, trades: [sell, ...prev.trades] }))
    })

    newSocket.on('multiplierUpgrade', (upgrade) => {
      console.log('Multiplier upgraded:', upgrade)
    })

    newSocket.on('goldenAlphasUpdate', (alphas) => {
      setData(prev => ({ ...prev, goldenAlphas: alphas }))
    })

    newSocket.on('positionsUpdate', (updatedPositions) => {
      setData(prev => ({ ...prev, positions: updatedPositions }));
    });

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
