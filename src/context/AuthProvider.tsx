import { createContext, useContext, ReactNode } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/models/users.model'

// ✅ Define AuthContext Interface
interface AuthContextType {
  user: User | null // Define a proper user type in the future
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => void
}

// ✅ Create Context
const AuthContext = createContext<AuthContextType | null>(null)

// ✅ Custom Hook to Access Context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// ✅ AuthProvider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuthStore()
  const { userQuery, signOutMutation } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: userQuery.isLoading,
        signOut: () => {
          signOutMutation.mutate()
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
