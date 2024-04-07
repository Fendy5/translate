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
import Icon from 'react-native-vector-icons/FontAwesome'

// const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
function App(): React.JSX.Element {
  checkVersion()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            options={{ tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} /> }}
            component={HomeScreen}
          />
          <Tab.Screen
            name="Recite"
            options={{ tabBarIcon: ({ color }) => <Icon name="book" size={30} color={color} /> }}
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
