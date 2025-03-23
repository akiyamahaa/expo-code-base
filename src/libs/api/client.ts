import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
