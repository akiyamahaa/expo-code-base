import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import API_CLIENT from '@/libs/api/client'
import { AuthRoutes } from '@/libs/api/routes/auth-routes'
import { _queryClient } from '@/context/QueryProvider'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

export function useAuth() {
  const { setUser, signOut, setToken, token } = useAuthStore()
  const router = useRouter()

  // ✅ Mutation for sign in
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Login and get token
      const response = await API_CLIENT.post(AuthRoutes.auth.signIn, {
        email,
        password,
      })
      return response.data
    },
    onSuccess: async (data: { access_token: string }) => {
      const { access_token } = data
      setToken(access_token)

      // 🟡 Gọi profile API để lấy thông tin người dùng
      const profileRes = await API_CLIENT.get(AuthRoutes.auth.me)

      // 🟡 Lưu user
      setUser(profileRes.data)

      await _queryClient.invalidateQueries({ queryKey: ['user'] })
      // ✅ Store user in Zustand
      router.push(ERouteTable.HOME) // ✅ Redirect after login
    },
    onError: () => {
      alert('Invalid credentials')
    },
  })
  // Thêm vào trong file useAuth.js
  const signUpMutation = useMutation({
    mutationFn: async ({
      name,
      username,
      email,
      password,
    }: {
      name: string
      username: string
      email: string
      password: string
    }) => {
      const response = await API_CLIENT.post(AuthRoutes.auth.signUp, {
        username,
        name,
        email,
        password,
      })
      return response.data
    },
    onSuccess: () => {
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      router.push(ERouteTable.SIGIN_IN)
    },
    onError: (error) => {
      console.error('Đăng ký thất bại:', error)
      alert(`Đăng ký thất bại.`)
    },
  })

  // ✅ Fetch authenticated user
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const profileRes = await API_CLIENT.get(AuthRoutes.auth.me)
        setUser(profileRes.data)
        return profileRes.data || null
      } catch (error) {
        console.error('Error fetching user:', error)
        return null
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false,
  })

  // ✅ Mutation for logout
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await API_CLIENT.post('/auth/sign-out') // ✅ Call logout API
    },
    onSuccess: async () => {
      console.log('signOut')
      await _queryClient.invalidateQueries({ queryKey: ['user'] }) // ✅ Clear React Query cache
      signOut() // ✅ Clear Zustand store
      router.push(ERouteTable.SIGIN_IN) // ✅ Redirect to login page
    },
  })

  return { signInMutation, signOutMutation, signUpMutation, userQuery }
}
