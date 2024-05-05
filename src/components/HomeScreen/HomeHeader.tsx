/**
 * @Author fendy
 * @CreateTime 2024/5/1 00:13
 * @Description
 */
import LinearGradient from 'react-native-linear-gradient'
import { TodayWordCount } from '@/components/HomeScreen/TodayWordCount.tsx'
import { StyleSheet, View } from 'react-native'
import WeekIcon from '~svgs/week.svg'
import MonthIcon from '~svgs/month.svg'
import TotalIcon from '~svgs/all.svg'
import React from 'react'
import { WordCount } from '@/components/HomeScreen/WordCount.tsx'

type HomeHeaderProps = {
  today: string
  week: string
  month: string
  total: string
}
export const HomeHeader = ({ today, week, month, total }: HomeHeaderProps) => {
  return (
    <LinearGradient colors={['#b985fc', '#91AFE1']} style={{ width: '100%', height: 164 }}>
      <TodayWordCount count={today} />
      <View style={styles.wordSecondaryCount}>
        <WordCount label={'本周总数'} value={week ?? '--'} Icon={WeekIcon} />
        <WordCount label={'本月总数'} value={month ?? '--'} Icon={MonthIcon} />
        <WordCount label={'单词总数'} value={total ?? '--'} Icon={TotalIcon} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  wordSecondaryCount: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
