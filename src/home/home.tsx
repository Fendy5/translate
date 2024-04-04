/**
 * @Author fendy
 * @CreateTime 2024/1/8 21:43
 * @Description
 */
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import WordCard from '@/components/WordCard.tsx'
import { download } from '@/utils/request.ts'
import { OverViewProp, WordCellProp, WordProp } from '@/types/word'
import { SvgProps } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient'
import WeekIcon from '~svgs/week.svg'
import MonthIcon from '~svgs/month.svg'
import TodayIcon from '~svgs/today.svg'
import TotalIcon from '~svgs/all.svg'
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'
import { getWordCells } from '~utils'
import Toast from 'react-native-toast-message'
import { getWordListApi, getWordOverviewApi } from '@/apis/word.ts'

export default function HomeScreen() {
  const [cells, setCells] = useState<WordCellProp[]>([])
  const [originData, setOriginData] = useState<WordProp[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [currentPlayVoice, setCurrentPlayVoice] = useState('')
  const [overview, setOverview] = useState<OverViewProp>({
    today: '--',
    total: '--',
    month: '--',
    week: '--'
  })
  const [sound, setSound] = useState<Sound | null>(null)

  // 刷新
  const onRefresh = React.useCallback(async () => {
    console.log('onRefresh')
    setPage(1)
    setOriginData([])
    await Promise.all([getWordOverview(), getMoreData()])
    Toast.show({
      type: 'success',
      topOffset: 10,
      text1: '加载成功'
    })
  }, [])

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

  // 单词统计
  const getWordOverview = async () => {
    const { data } = await getWordOverviewApi()
    setOverview(data)
  }

  useEffect(() => {
    getWordOverview()
  }, [])

  const getMoreData = async () => {
    try {
      console.log('page~', page)
      const rsp = await getWordListApi({ page })
      const words = rsp.data.records
      console.log('load-more', words)
      const tempOriginData = [...originData, ...words]
      setOriginData(tempOriginData)
      setCells(getWordCells(tempOriginData))
    } catch (e) {
      console.log('e', e)
      // setError(`Error: ${e}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    getMoreData()
  }, [page])

  const onLoadMore = async () => {
    console.log('onLoadMore~', loading)
    !loading && setPage(page + 1)
  }

  const WordCount = ({ label, value, Icon }: { label: string; value: string; Icon: React.FC<SvgProps> }) => (
    <View style={styles.allWordCount}>
      <View style={styles.allWordCountLabel}>
        {<Icon />}
        <Text style={styles.allWordCountLabelText}>{label}</Text>
      </View>
      <Text style={styles.allWordCountValue}>{value}</Text>
    </View>
  )
  const Header = () => {
    return (
      <LinearGradient colors={['#b985fc', '#91AFE1']} style={{ width: '100%', height: 164 }}>
        <TodayWordCount />
        <View style={styles.wordSecondaryCount}>
          <WordCount label={'本周总数'} value={overview?.week ?? '--'} Icon={WeekIcon} />
          <WordCount label={'本月总数'} value={overview?.month ?? '--'} Icon={MonthIcon} />
          <WordCount label={'单词总数'} value={overview?.total ?? '--'} Icon={TotalIcon} />
        </View>
      </LinearGradient>
    )
  }

  const WordCell = ({ item }: { item: WordCellProp }) => {
    return (
      <View style={styles.wordCardItem}>
        <Text style={styles.timeText}>{item.date}</Text>
        {item.words.map(i => (
          <WordCard
            playLoop={() => playLoop(i.origin_text)}
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

  const TodayWordCount = () => (
    <View style={styles.allWordCount}>
      <View style={styles.allWordCountLabel}>
        <TodayIcon />
        <Text style={styles.allWordCountLabelText}>今天单词</Text>
      </View>
      <Text style={styles.allWordCountValue}>{overview.today ?? '--'}</Text>
    </View>
  )

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={'#b985fc'} />
      <View style={styles.appContainer}>
        <Header />
        <FlatList
          data={cells}
          refreshing={loading}
          onRefresh={onRefresh}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={item => item.date}
          renderItem={WordCell}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ActivityIndicator />}
          style={[styles.wordPanel]}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appContainer: {
    height: '100%',
    display: 'flex'
  },
  wordPanel: {
    flex: 1,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16
  },
  banner: {
    width: '100%',
    height: 154
  },
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
  },
  wordSecondaryCount: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  homeContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 200,
    paddingHorizontal: 24
  },
  wordCardItem: {},
  timeText: {
    fontFamily: 'PingFang SC',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.85)'
  }
})
