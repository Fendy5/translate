/**
 * @Author fendy
 * @CreateTime 2024/3/3 00:00
 * @Description
 */
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-toast-message'

const service = axios.create({
  // baseURL: 'https://translate.fendy5.cn',
  baseURL: __DEV__ ? 'http://10.0.2.2:8000' : 'https://translate.fendy5.cn',
  // withCredentials: true,
  timeout: 150000
})

service.interceptors.request.use(
  config => {
    // 判断store是否存在token
    // const token = UserModule.token || getToken()
    // if (token) {
    //   // 存在token就在请求携带token
    //   config.headers.Authorization = 'Bearer ' + token
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const download = async (downloadLink: string, fileName: string, path?: string) => {
  // try {
  //   const rsp = await axios.get(url, { responseType: 'blob' })
  //   console.log('rsp', rsp)
  //   console.log('data:', rsp.data)
  //   const path = `${RNFetchBlob.fs.dirs.MusicDir}/${fileName}`
  //   await RNFetchBlob.fs.writeFile(path, rsp.data)
  // } catch (e) {
  //   console.error(e)
  // }
  path = path || `${RNFetchBlob.fs.dirs.MainBundleDir}/sounds/${fileName}`
  const res = await RNFetchBlob.config({
    path,
    fileCache: true
  }).fetch('GET', downloadLink)
  Toast.show({
    type: 'success',
    text1: '下载成功',
    topOffset: 10,
    text2: `The file saved to ${res.path()}`
  })
  console.log('The file saved to ', res.path())
  // .then(res => {
  //   Toast.show({
  //     type: 'success',
  //     text1: '下载成功',
  //     topOffset: 10,
  //     text2: `The file saved to ${res.path()}`
  //   })
  //   console.log('The file saved to ', res.path())
  // })
}

service.interceptors.response.use(
  response => {
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
