import { useState } from 'react'
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'

const SignUp = () => {
  const [name, setName] = useState('Nguyễn Văn A')
  const [username, setUsername] = useState('nguyenvana')
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('secret123')
  const [loading, setLoading] = useState(false)
  const { signUpMutation } = useAuth()

  const router = useRouter()

  const handleSignUp = async () => {
    try {
      setLoading(true)

      signUpMutation.mutate({ email, password, name, username })
    } catch (error: any) {
      Alert.alert('Signup failed', error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center bg-white px-6 py-10">
        <Text className="text-3xl font-bold mb-8 text-center">Sign Up</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded px-4 py-3 mb-4 text-base"
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          className="border border-gray-300 rounded px-4 py-3 mb-4 text-base"
        />
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
          onPress={handleSignUp}
          className={`bg-green-600 py-3 rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push('/sign-in')}>
          <Text className="text-center text-sm text-blue-600 mt-6">
            Already have an account? <Text className="font-semibold">Login</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default SignUp
