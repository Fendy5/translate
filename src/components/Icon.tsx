/**
 * @Author fendy
 * @CreateTime 2024/4/14 14:03
 * @Description
 */
import { Text } from 'react-native'
import React from 'react'

export default function Icon({ size, color, code }) {
  return <Text style={{ fontFamily: 'iconfont', fontSize: size, color }}>{code}</Text>
}
