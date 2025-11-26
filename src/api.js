// frontend/src/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// Optional: log errors
API.interceptors.response.use(
  res => res,
  err => {
    console.error("API Error:", err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export default API