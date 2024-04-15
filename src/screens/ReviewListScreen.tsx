import React from 'react'
import { Text } from 'react-native'

const ReviewListScreen = ({ route }: { route: any }) => {
  const { type } = route.params
  return <Text>Hello!-{type}</Text>
}

export default ReviewListScreen
