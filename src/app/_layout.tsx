import { Stack } from 'expo-router'
import '~/global.css' // Tailwind / NativeWind globals
import { QueryProvider } from '@/context/QueryProvider'

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  )
}
