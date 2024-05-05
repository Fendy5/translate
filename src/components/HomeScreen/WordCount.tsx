/**
 * @Author fendy
 * @CreateTime 2024/5/1 00:20
 * @Description
 */
import React from 'react'
import { SvgProps } from 'react-native-svg'
import { StyleSheet, Text, View } from 'react-native'

export const WordCount = ({ label, value, Icon }: { label: string; value: string; Icon: React.FC<SvgProps> }) => (
  <View style={styles.allWordCount}>
    <View style={styles.allWordCountLabel}>
      {<Icon />}
      <Text style={styles.allWordCountLabelText}>{label}</Text>
    </View>
    <Text style={styles.allWordCountValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  allWordCount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#FFF',
    marginTop: 8
  },
  allWordCountLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  allWordCountLabelText: {
    color: '#FFF',
    opacity: 0.85,
    paddingLeft: 2,
    fontSize: 16
  },
  allWordCountValue: {
    color: '#FFF',
    fontSize: 26
  }
})
