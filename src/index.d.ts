/**
 * @Author fendy
 * @CreateTime 2024/1/3 22:40
 * @Description
 */
declare module '*.png'

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
