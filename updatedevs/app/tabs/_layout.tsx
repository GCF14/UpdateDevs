import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../components/TabBar'

const _layout = () => {
  return (
    <Tabs 
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerTitleAlign: 'center'
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title: "Search",
                headerTitleAlign: 'center'
            }}
        />
        <Tabs.Screen
            name="bookmark"
            options={{
                title: "Bookmark",
                headerTitleAlign: 'center'
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                headerTitleAlign: 'center'
            }}
        />
    </Tabs>
  )
}

export default _layout