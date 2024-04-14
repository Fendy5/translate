/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/home/home.tsx'
import Toast from 'react-native-toast-message'
import checkVersion from '@/utils/checkVersion.ts'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import ReciteScreen from '@/screens/ReciteScreen.tsx'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from '@/components/Icon.tsx'

// const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
function App(): React.JSX.Element {
  checkVersion()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          theme={{ colors: { secondaryContainer: 'transparent' } }}
          activeColor={'#6a2bf5'}
          barStyle={{ backgroundColor: '#ffffff' }}>
          <Tab.Screen
            name="Home"
            options={{
              title: '首页',
              tabBarIcon: ({ color }) => <Icon code={'\ue657'} color={color} size={24} />
            }}
            component={HomeScreen}
          />
          <Tab.Screen
            name="Review"
            options={{
              title: '复习',
              tabBarIcon: ({ color }) => <Icon code={'\ue683'} color={color} size={24} />
            }}
            component={ReciteScreen}
          />
        </Tab.Navigator>
        {/*<Stack.Navigator>*/}
        {/*  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />*/}
        {/*</Stack.Navigator>*/}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  )
}

export default App
