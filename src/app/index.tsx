import { Text, View } from 'react-native'
import { useAppSelector } from '../redux'

export default function Index() {
  const counter = useAppSelector((state) => state.counter)
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-200 text-2xl">Edit app/index.tsx to edit this screen.</Text>
      <Text className="text-blue-300 text-3xl">{counter.value}</Text>
    </View>
  )
}
