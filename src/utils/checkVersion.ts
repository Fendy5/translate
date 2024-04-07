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
  console.log('version', data)
  console.log(data > appVersion)
  if (compareVersion(data, appVersion)) {
    Toast.show({
      text1: '发现新版本',
      text2: `最新版本: ${data}`
    })
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/translate-v${data}.apk`
    console.log('path', path)
    RNFetchBlob.fs.exists(path).then(exists => {
      if (exists) {
        console.log('APP已下载')
        RNFetchBlob.android.actionViewIntent(path, 'application/vnd.android.package-archive')
      } else {
        console.log('正在下载APP')
        downloadApp().then(async () => {
          const appLink = 'https://translate.fendy5.cn/api/v1/download'
          await download(appLink, 'app-release', path)
          await RNFetchBlob.android.actionViewIntent(path, 'application/vnd.android.package-archive')
        })
      }
    })
  }
}

// v1>v2
const compareVersion = (v1: string, v2: string) => {
  const v1Arr = v1.split('.')
  const v2Arr = v2.split('.')
  return v1Arr[0] > v2Arr[0] || v1Arr[1] > v2Arr[1] || v1Arr[2] > v2Arr[2]
}

const downloadApp = async () => {}

export default checkVersion
