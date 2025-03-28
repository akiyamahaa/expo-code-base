import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  user: null | { id: string; email: string }
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  setUser: (user: AuthState['user']) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      signOut: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        // Xoá luôn storage nếu muốn reset toàn bộ
        useAuthStore.persist?.clearStorage?.()
      },
    }),
    {
      name: 'auth-storage', // Tên key lưu trong AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
