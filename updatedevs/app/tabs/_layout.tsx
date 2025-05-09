import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../components/TabBar'

const _layout = () => {
  return (
    <Tabs>
        {/* <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title: "Search"
            }}
        />
        <Tabs.Screen
            name="bookmark"
            options={{
                title: "Bookmark"
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile"
            }}
        /> */}
    </Tabs>
  )
}

export default _layout