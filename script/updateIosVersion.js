/*
 * @Author fendy
 * @CreateDate 2024/3/26
 * @Description 更新IOS版本号
 */
// import VersionNumber from 'react-native-version-number'
// const plist = require('plist')
// const fs = require('fs')
//
// const getVersion = async () => {
//   const data = await fs.readFileSync('../package.json')
//   const packageJson = JSON.parse(data)
//   return packageJson.version
// }
//
// getVersion()
//
// const infoPlistPath = '../ios/translate/Info.plist' // Info.plist 文件路径
//
// // 读取 Info.plist 文件内容
// const infoPlistContent = fs.readFileSync(infoPlistPath, 'utf8')
// const plistData = plist.parse(infoPlistContent)
//
// // 更新版本号
// plistData.CFBundleShortVersionString = getVersion()
//
// // 将更新后的内容写回 Info.plist 文件
// const updatedInfoPlistContent = plist.build(plistData)
// fs.writeFileSync(infoPlistPath, updatedInfoPlistContent, 'utf8')
