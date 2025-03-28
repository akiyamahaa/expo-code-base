import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'

const API_CLIENT = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

API_CLIENT.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// API_CLIENT.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized! Redirecting to login...')
//       // TODO: Thêm logic refresh token nếu cần
//       const { signOut } = useAuthStore.getState()
//       signOut()

//       if (typeof window !== 'undefined') {
//         window.location.href = '/login'
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export default API_CLIENT
