/**
 * @Author fendy
 * @CreateTime 2024/3/26 22:49
 * @Description 检查应用版本
 */
import DeviceInfo from 'react-native-device-info'
import { getVersionApi } from '@/services/version.ts'
import Toast from 'react-native-toast-message'
import { download } from '@/utils/request.ts'
import RNFetchBlob from 'rn-fetch-blob'

const checkVersion = async () => {
  const appVersion = DeviceInfo.getVersion()
  const { data } = await getVersionApi()
  if (compareVersion(data, appVersion)) {
    Toast.show({
      text1: '发现新版本',
      text2: `最新版本: ${data}`
    })
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/translate-v${data}.apk`
    console.log('path', path)
    RNFetchBlob.fs.exists(path).then(async exists => {
      if (exists) {
        console.log('APP已下载')
        await RNFetchBlob.android.actionViewIntent(path, 'application/vnd.android.package-archive')
      } else {
        console.log('正在下载APP')
        const appLink = 'https://translate.fendy5.cn/api/v1/download'
        await download(appLink, `translate-v${data}.apk`, path)
        await RNFetchBlob.android.actionViewIntent(path, 'application/vnd.android.package-archive')
      }
    })
  }
}

// v1>v2
const compareVersion = (online: string, local: string) => {
  const onLineArr = online.split('.').map(Number)
  const localArr = local.split('.').map(Number)
  return onLineArr[0] > localArr[0] || onLineArr[1] > localArr[1] || onLineArr[2] > localArr[2]
}

const downloadApp = async () => {}

export default checkVersion
