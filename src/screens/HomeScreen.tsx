/**
 * @Author fendy
 * @CreateTime 2024/4/30 20:07
 * @Description 首页
 */
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native'
import WordCard from '@/components/WordCard.tsx'
import { download } from '@/utils/request.ts'
import { OverViewProp, WordSectionProp } from '@/types/word'
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'
import { getTodayWordListApi, getWordListApi, getWordOverviewApi, updateProficiencyApi } from '@/services/word.ts'
import { HomeHeader } from '@/components/HomeScreen/HomeHeader.tsx'
import { throttle } from 'lodash'

export default function HomeScreen() {
  const [page, setPage] = useState(1)

  // 音频播放相关
  const [currentPlayVoice, setCurrentPlayVoice] = useState('')
  const [sound, setSound] = useState<Sound | null>(null)
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
  const [overview, setOverview] = useState<OverViewProp>({
    today: '--',
    total: '--',
    month: '--',
    week: '--'
  })
  const getWordOverview = async () => {
    const { data } = await getWordOverviewApi()
    setOverview(data)
  }

  const initWordList = [
    {
      title: '今天单词',
      data: []
    },
    {
      title: '复习单词',
      data: []
    }
  ]
  const [wordList, setWordList] = useState<WordSectionProp[]>(initWordList)
  // 获取当天的单词列表
  const getTodayWordList = async () => {
    const { data } = await getTodayWordListApi({ size: 999, page: 1 })
    if (data.records?.length) {
      setWordList(pre => {
        const newData = [...pre]
        newData[0].data = data.records
        return newData
      })
    }
  }

  // 获取随机单词
  const getRandomWordList = async () => {
    const { data } = await getWordListApi({ page }, 'random')
    console.log('data', data)
    setWordList(pre => {
      const newData = [...pre]
      newData[1].data = [...newData[1].data, ...data.records]
      return newData
    })
  }
  const onLoadMore = throttle(() => {
    setPage(page + 1)
  }, 3000)
  const onPrimaryBtn = async (origin_text: string, index: number) => {
    const { code } = await updateProficiencyApi({ origin_text })
    if (code === 1) {
      setWordList(pre => {
        const newData = [...pre]
        newData[1].data.splice(index, 1)
        return newData
      })
    }
  }
  const onSecondaryBtn = async (origin_text: string, index: number) => {
    const { code } = await updateProficiencyApi({ origin_text, update_type: 'reduce' })
    if (code === 1) {
      setWordList(pre => {
        const newData = [...pre]
        newData[1].data.splice(index, 1)
        return newData
      })
    }
  }

  // 刷新
  const [freshLoading, setFreshLoading] = useState(false)
  const onRefresh = () => {
    setFreshLoading(true)
    setWordList(initWordList)
    setPage(1)
    getTodayWordList()
    // getRandomWordList()
    setFreshLoading(false)
  }

  useEffect(() => {
    getWordOverview()
    getTodayWordList()
  }, [])

  useEffect(() => {
    console.log('useEffect', page)
    getRandomWordList()
  }, [page])

  return (
    <View style={styles.appContainer}>
      {Platform.OS === 'android' ? (
        <StatusBar barStyle="light-content" backgroundColor={'#b985fc'} />
      ) : (
        <View style={styles.statusBar} />
      )}
      <HomeHeader {...overview} />
      <View style={styles.wordPanel}>
        <SectionList
          sections={wordList}
          showsVerticalScrollIndicator={false}
          refreshing={freshLoading}
          onRefresh={onRefresh}
          onEndReached={onLoadMore}
          ListEmptyComponent={() => <Text>暂无数据</Text>}
          ListFooterComponent={() => <ActivityIndicator style={styles.loading} size="small" color="#6236FF" />}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.timeText}>{title}</Text>}
          renderItem={({ index, item, section: { title, data } }) => {
            if (data.length === 0) {
              return <Text style={styles.timeText}>No data in this section</Text> // 在这里展示空数据提示
            }
            return (
              <View style={styles.wordCardItem}>
                <WordCard
                  playLoop={playLoop}
                  primaryBtn={onPrimaryBtn}
                  isMask
                  secondaryBtn={onSecondaryBtn}
                  key={item.id}
                  index={index}
                  showFooter={title === '复习单词'}
                  stopPlay={stopPlay}
                  isPlaying={currentPlayVoice === item.origin_text}
                  playSound={playSound}
                  word={item}
                />
              </View>
            )
          }}
        />
      </View>
      {/*<ScrollView scrollEventThrottle={500} onScroll={onScroll} stickyHeaderIndices={[0, 2]} style={styles.wordPanel}>*/}
      {/*  <View>*/}
      {/*    <Text style={styles.timeText}>今天</Text>*/}
      {/*  </View>*/}
      {/*  <View>*/}
      {/*    {todayWordList.length ? (*/}
      {/*      <View style={styles.wordCardItem}>*/}
      {/*        {todayWordList?.map(i => (*/}
      {/*          <WordCard*/}
      {/*            playLoop={playLoop}*/}
      {/*            key={i.id}*/}
      {/*            stopPlay={stopPlay}*/}
      {/*            isPlaying={currentPlayVoice === i.origin_text}*/}
      {/*            playSound={playSound}*/}
      {/*            word={i}*/}
      {/*          />*/}
      {/*        ))}*/}
      {/*      </View>*/}
      {/*    ) : (*/}
      {/*      <Text style={styles.emptyData}>今天暂无数据</Text>*/}
      {/*    )}*/}
      {/*  </View>*/}
      {/*  <View>*/}
      {/*    <Text style={styles.timeText}>单词复习</Text>*/}
      {/*  </View>*/}
      {/*  <View style={styles.wordCardItem}>*/}
      {/*    {randomWordList?.map(i => (*/}
      {/*      <WordCard*/}
      {/*        playLoop={playLoop}*/}
      {/*        key={i.id}*/}
      {/*        stopPlay={stopPlay}*/}
      {/*        isPlaying={currentPlayVoice === i.origin_text}*/}
      {/*        playSound={playSound}*/}
      {/*        word={i}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </View>*/}
      {/*  {loading ? <ActivityIndicator size="small" color="#0000ff" /> : ''}*/}
      {/*</ScrollView>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusBar: {
    backgroundColor: '#b985fc',
    height: 44
  },
  appContainer: {
    backgroundColor: '#eaecf4',
    height: '100%',
    display: 'flex'
  },
  emptyData: {
    textAlign: 'center'
  },
  wordPanel: {
    flex: 1,
    marginRight: 16,
    // paddingBottom: 32,
    marginLeft: 16
  },
  loading: {
    marginBottom: 16
  },
  banner: {
    width: '100%',
    height: 154
  },
  homeContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 200,
    paddingHorizontal: 24
  },
  wordCardItem: {},
  timeText: {
    backgroundColor: '#eaecf3',
    fontFamily: 'PingFang SC',
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 10,
    // marginTop: 12,
    // marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.85)'
  }
})
