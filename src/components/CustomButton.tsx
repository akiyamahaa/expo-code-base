import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

type Props = {
  title: string
  containerStyle?: string
  textStyle?: string
  isLoading?: boolean
} & TouchableOpacityProps

const CustomButton = ({
  title,
  containerStyle = '',
  textStyle = '',
  isLoading,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-blue-500 w-full rounded-xl min-h-[40px] justify-center 
          items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      {...props}
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
