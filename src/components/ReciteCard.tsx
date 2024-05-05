/**
 * @Author fendy
 * @CreateTime 2024/4/28 23:33
 * @Description 背诵卡片
 */
import React from 'react'
import WordCard from '@/components/WordCard.tsx'
import { Button, StyleSheet, Text, View } from 'react-native'
import { WordCardProps } from '@/types/word'

export default function ReciteCard({ word, playSound, isPlaying, playLoop, stopPlay }: WordCardProps) {
  return (
    <View>
      <WordCard isPlaying={isPlaying} playLoop={playLoop} stopPlay={stopPlay} word={word} playSound={playSound}>
        <View style={styles.cardFooter}>
          <View style={styles.btn}>
            <Button title="生疏" color="#6D7278" />
          </View>
          <View style={[styles.btn, styles.leftLine]}>
            <Button title="熟悉" color="#6236FF" />
          </View>
        </View>
      </WordCard>
    </View>
  )
}

const styles = StyleSheet.create({
  cardFooter: {
    display: 'flex',
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1
  },
  leftLine: {
    borderLeftColor: '#E5E5E5',
    borderLeftWidth: 1
  },
  btn: {
    fontSize: 20,
    width: '50%'
  }
})
