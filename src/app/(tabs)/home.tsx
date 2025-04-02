import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/context/AuthProvider'

const Home = () => {
  const { signOut } = useAuthContext()
  const { user } = useAuthContext()
  return (
    <View className="flex-1 mt-12">
      <Text>Hello, {user?.name}</Text>
      <Pressable onPress={signOut} className="bg-red-500 px-6 py-3 rounded w-40">
        <Text className="text-white font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default Home
