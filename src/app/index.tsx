import { Image, Text, View } from 'react-native'
import { useAppSelector } from '../redux'
import { useEffect } from 'react'
import { router } from 'expo-router'

export default function Index() {
  const counter = useAppSelector((state) => state.counter)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(no-tabs)/splash')
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="flex-1 justify-center items-center">
      {/* <Image source={images.logo} className="w-[186px] h-[276px]" /> */}
    </View>
  )
}
