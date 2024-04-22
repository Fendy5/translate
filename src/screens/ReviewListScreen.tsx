import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getReviewApi } from '@/services/word.ts'
import { WordCellProp, WordProp } from '@/types/word'
import { getWordCells } from '~utils'
import WordCard from '@/components/WordCard.tsx'
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'
import { download } from '@/utils/request.ts'
import Icon from '@/components/Icon.tsx'

const ReviewListScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation()
  const [page, setPage] = useState(1)
  const [cells, setCells] = useState<WordCellProp[]>([])
  const [loading, setLoading] = useState(true)
  const [originData, setOriginData] = useState<WordProp[]>([])
  const [sound, setSound] = useState<Sound | null>(null)
  const [currentPlayVoice, setCurrentPlayVoice] = useState('')

  const { type, title } = route.params
  useEffect(() => {
    navigation.setOptions({ title, headerBackTitle: '返回' })
  })

  useEffect(() => {
    getDataList()
  }, [page])

  // 请求数据相关
  const getDataList = async () => {
    setLoading(true)
    const rsp = await getReviewApi(type, { page })
    console.log('rsp', rsp)
    const words = rsp.data.records
    if (words.length < 10) {
      setAllDataLoaded(true)
    }
    const tempOriginData = [...originData, ...words]
    setOriginData(tempOriginData)
    setCells(getWordCells(tempOriginData))
    setLoading(false)
  }
  const onLoadMore = async () => {
    !loading && setPage(page + 1)
  }

  // 音频播放相关
  const playSound = (text: string) => {
    return new Promise<Sound>((resolve, reject) => {
      const path = `${RNFetchBlob.fs.dirs.MainBundleDir}/sounds/${text}.mp3`
      console.log('path', path)
      const soundBundle = Platform.OS === 'ios' ? '' : Sound.DOCUMENT
      if (sound) {
        sound.stop()
        sound.release()
      }
      let soundInstance: Sound = new Sound(path, soundBundle, async error => {
        console.log('error:', error)
        if (error?.message === 'resource not found' || error?.code === 'ENSOSSTATUSERRORDOMAIN2003334207') {
          await download(`https://fanyi.baidu.com/gettts?lan=en&text=${text}&spd=3&source=web`, `${text}.mp3`)
          soundInstance = new Sound(path, soundBundle, async e => {
            if (e) {
              console.log('播放失败', e)
            } else {
              setSound(soundInstance)
              play(soundInstance)
            }
          })
        } else if (!error) {
          setSound(soundInstance)
          play(soundInstance)
        }
      })

      const play = (s: Sound) => {
        setCurrentPlayVoice(text)
        s.play(success => {
          if (success) {
            setCurrentPlayVoice('')
            resolve(soundInstance)
            console.log('successfully finished playing')
          } else {
            reject()
            console.log('playback failed due to audio decoding errors')
          }
        })
      }
    })
  }
  // 停止播放
  const stopPlay = () => {
    if (sound) {
      sound.stop(() => {
        sound.release()
        setCurrentPlayVoice('')
      })
    }
  }
  // 循环播放
  const playLoop = async (text: string) => {
    if (currentPlayVoice === text && sound?.isPlaying()) {
      stopPlay()
    } else {
      const s = await playSound(text)
      if (s) {
        s.setNumberOfLoops(-1)
        setCurrentPlayVoice(text)
        s.play()
      }
    }
  }

  const WordCell = ({ item }: { item: WordCellProp }) => {
    return (
      <View>
        <Text style={styles.timeText}>{item.date}</Text>
        {item.words.map(i => (
          <WordCard
            playLoop={playLoop}
            key={i.id}
            stopPlay={stopPlay}
            isPlaying={currentPlayVoice === i.origin_text}
            playSound={playSound}
            word={i}
          />
        ))}
      </View>
    )
  }
  const Empty = () => (
    <View style={styles.empty}>
      <Icon code={'\ue608'} size={64} color={'#000'} />
      <Text style={styles.emptyDesc}>暂无数据</Text>
    </View>
  )

  const [allDataLoaded, setAllDataLoaded] = useState(false)
  const renderFooter = () => {
    if (allDataLoaded) {
      return null
    }
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cells}
        refreshing={loading}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={item => item.date}
        renderItem={WordCell}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default ReviewListScreen

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  timeText: {
    fontFamily: 'PingFang SC',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.85)'
  },
  empty: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emptyDesc: {
    marginTop: 8
  }
})
