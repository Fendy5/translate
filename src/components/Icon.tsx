/**
 * @Author fendy
 * @CreateTime 2024/4/14 14:03
 * @Description
 */
import { Text } from 'react-native'
import React from 'react'

type IconProps = {
  size: number
  color: string
  code: string
}
export default function Icon({ size, color, code }: IconProps) {
  return <Text style={{ fontFamily: 'iconfont', fontSize: size, color }}>{code}</Text>
}
