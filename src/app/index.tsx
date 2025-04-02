import { Image, StatusBar, View } from 'react-native'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { images } from '@/constants'
import { useAuthContext } from '@/context/AuthProvider'
import { ERouteTable } from '@/constants/route-table'

export default function Root() {
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace(ERouteTable.SPLASH)
      } else {
        router.replace(ERouteTable.SIGIN_IN)
      }
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
