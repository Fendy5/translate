/**
 * @Author fendy
 * @CreateTime 2024/5/1 00:16
 * @Description 今天数量组件
 */
import { StyleSheet, Text, View } from 'react-native'
import TodayIcon from '~svgs/today.svg'
import React from 'react'

export const TodayWordCount = ({ count }: { count: string }) => (
  <View style={styles.allWordCount}>
    <View style={styles.allWordCountLabel}>
      <TodayIcon />
      <Text style={styles.allWordCountLabelText}>今天单词</Text>
    </View>
    <Text style={styles.allWordCountValue}>{count ?? '--'}</Text>
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
