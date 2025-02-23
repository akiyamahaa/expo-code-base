import React from 'react'
import { Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import { Home3, Flashy, TableDocument, Profile } from 'iconsax-react-native'

type TabIconProps = {
  name: string
  Icon: React.ElementType
  focused: boolean
  color: string
  size?: number
}

const TabIcon = ({ name, color, focused, Icon, size = 24 }: TabIconProps) => {
  return (
    <View className="flex-1 pt-1 items-center gap-1">
      <Icon size={size} color={color} variant="Broken" />
      <Text style={{ color }} className={`${focused ? 'font-semibold' : 'font-medium'} text-xs`}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: '#00CEE6',
          tabBarInactiveTintColor: '#71717A',
          tabBarStyle: {
            backgroundColor: '#27272A',
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon name="Home" Icon={Home3} {...props} />,
          }}
        />

        <Tabs.Screen
          name="lesson"
          options={{
            title: 'Lesson',
            tabBarIcon: (props) => <TabIcon name="Home" Icon={Flashy} {...props} />,
          }}
        />

        <Tabs.Screen
          name="news"
          options={{
            title: 'News',
            tabBarIcon: (props) => <TabIcon name="Home" Icon={TableDocument} {...props} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: (props) => <TabIcon name="Home" Icon={Profile} {...props} />,
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
