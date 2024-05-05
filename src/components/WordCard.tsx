/**
 * @Author fendy
 * @CreateTime 2024/1/8 21:42
 * @Description 单词卡片
 */

import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DictionaryProp, WordCardProps } from '@/types/word'

export default function WordCard({
  word,
  playSound,
  isPlaying,
  primaryBtn,
  index,
  secondaryBtn,
  playLoop,
  stopPlay,
  showFooter = true
}: WordCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <TouchableOpacity onLongPress={() => playLoop(word.origin_text)} onPress={() => playSound(word.origin_text)}>
          <Text style={styles.word}>{word.origin_text}</Text>
          <View style={styles.phonetic}>
            <Text style={styles.phoneticText}>{word.phonetic_symbol} </Text>
            {/*<VoicePng />*/}
            {isPlaying ? (
              <TouchableOpacity onPress={stopPlay}>
                <Image source={require('~images/voice.gif')} style={styles.voiceIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => playLoop(word.origin_text)}>
                <Image source={require('~images/voice_static.png')} style={styles.voiceIcon} />
              </TouchableOpacity>
            )}
          </View>
          {word.dictionaries.length ? (
            word.dictionaries.map((i: DictionaryProp) => (
              <Text key={i.id} style={styles.annotation}>
                {i.annotation}
              </Text>
            ))
          ) : (
            <Text style={styles.annotation}>{word.translation_text}</Text>
          )}
        </TouchableOpacity>
      </View>
      {showFooter ? (
        <View style={styles.cardFooter}>
          <View style={styles.btn}>
            <Button onPress={() => secondaryBtn(word.origin_text, index)} title="生疏" color="#6D7278" />
          </View>
          <View style={[styles.btn, styles.leftLine]}>
            <Button onPress={() => primaryBtn(word.origin_text, index)} title="熟悉" color="#6236FF" />
          </View>
        </View>
      ) : (
        ''
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#EAECF4',
    borderRadius: 8,
    marginBottom: 12
  },
  cardContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8
  },
  cardFooter: {
    display: 'flex',
    paddingTop: 4,
    paddingBottom: 4,
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
  },
  voiceIcon: {
    width: 18,
    height: 18
  },
  word: {
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    fontSize: 40,
    color: '#000'
  },
  // 音标
  phonetic: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end'
  },
  phoneticText: {
    color: '#000',
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    fontSize: 12,
    marginRight: 20
  },
  phoneticIcon: {},
  annotation: {
    color: '#000',
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    paddingBottom: 8,
    fontSize: 16
  }
})
