/**
 * @Author fendy
 * @CreateTime 2024/1/8 21:42
 * @Description
 */

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WordProp } from '@/types/word'

type WordCardProps = {
  word: WordProp
  isPlaying: boolean
  playSound: (text: string) => void
  playLoop: (text: string) => void
  stopPlay?: () => void
}
export default function WordCard({ word, playSound, isPlaying, playLoop, stopPlay }: WordCardProps) {
  return (
    <TouchableOpacity onPress={() => playSound(word.origin_text)}>
      <View style={styles.card}>
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
          word.dictionaries.map(i => (
            <Text key={i.id} style={styles.annotation}>
              {i.annotation}
            </Text>
          ))
        ) : (
          <Text style={styles.annotation}>{word.translation_text}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#EAECF4',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 32,
    marginBottom: 12
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
    paddingBottom: 6,
    fontSize: 16
  }
})
