import { Image, StatusBar, View } from 'react-native'
import { useAppSelector } from '../redux'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { images } from '@/constants'

export default function Root() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(no-tabs)/splash')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <Image source={images.splash} className="w-full h-full" />
    </View>
  )
}
