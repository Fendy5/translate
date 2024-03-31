/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/home/home.tsx'
import Toast from 'react-native-toast-message'
import checkVersion from '@/utils/checkVersion.ts'

const Stack = createNativeStackNavigator()
function App(): React.JSX.Element {
  checkVersion()
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}

export default App
