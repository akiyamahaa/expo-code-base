import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

const SignIn = () => {
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('secret123')
  const [loading, setLoading] = useState(false)
  const { signInMutation } = useAuth()
  const router = useRouter()
  const handleLogin = async () => {
    try {
      setLoading(true)
      signInMutation.mutate({ email, password })
    } catch (error: any) {
      Alert.alert('Login failed', error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8 text-center">Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-300 rounded px-4 py-3 mb-4 text-base"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded px-4 py-3 mb-6 text-base"
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className={`bg-blue-600 py-3 rounded ${loading ? 'opacity-50' : ''}`}
      >
        <Text className="text-white text-center text-base font-semibold">
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </Pressable>

      {/* ✅ Sign Up button */}
      <Pressable onPress={() => router.push(ERouteTable.SIGIN_UP)}>
        <Text className="text-center text-sm text-blue-600 mt-6">
          Don’t have an account? <Text className="font-semibold">Sign up</Text>
        </Text>
      </Pressable>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
