/**
 * @Author fendy
 * @CreateTime 2024/4/7 21:43
 * @Description
 */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '@/components/Icon.tsx'
import LinearGradient from 'react-native-linear-gradient'

export default function ReciteScreen() {
  const cardList = [
    { title: '当周单词', desc: '复习当周的单词', code: '\ue70d', color: '#FA6400', bg: ['#F8C7C7', '#F4E6E6'] },
    { title: '当月单词', desc: '复习当月的单词', code: '\ue61c', color: '#408BE1', bg: ['#8CBFFA', '#FEDBDB'] },
    { title: '今年单词', desc: '复习今年的单词', code: '\ue610', color: '#C322FF', bg: ['#C59DF9', '#F8E6FF'] },
    { title: '自定义单词', desc: '自定义时间段', code: '\ueb6a', color: '#FF954E', bg: ['#F8F5C7', '#F4E6E6'] }
  ]
  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={['#b985fc', '#E3E3E3', '#91AFE1']}
      style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.cardList}>
          {cardList.map(i => (
            <LinearGradient colors={i.bg} start={{ x: 0.85, y: 0 }} end={{ x: 0, y: 1 }} style={styles.card}>
              <View>
                <Text style={styles.title}>{i.title}</Text>
                <Text style={styles.desc}>{i.desc}</Text>
              </View>
              <Icon code={i.code} color={i.color} size={32} />
            </LinearGradient>
          ))}
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    flexDirection: 'row'
  },
  card: {
    display: 'flex',
    width: ' 48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    padding: 16,
    marginBottom: 32,
    borderRadius: 8
  },
  title: {
    color: '#FD5959',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  desc: {
    fontSize: 12,
    color: '#6D7278'
  }
})
