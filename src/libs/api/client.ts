import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'
import { API_BASE_URL } from '../env'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

const API_CLIENT = axios.create({
  baseURL: API_BASE_URL || 'https://your-api.com',
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

API_CLIENT.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Delete all Zustand state
      const signOut = useAuthStore.getState().signOut
      signOut()
      const router = useRouter()
      router.replace(ERouteTable.SIGIN_IN)
    }
    return Promise.reject(error)
  },
)

export default API_CLIENT
