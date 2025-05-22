import { Image, StatusBar, View } from 'react-native'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { useAuthStore } from '@/store/useAuthStore'

export default function Root() {
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(ERouteTable.SPLASH)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isAuthenticated])

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <Image source={images.splash} className="w-full h-full" />
    </View>
  )
}
