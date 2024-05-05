/**
 * @Author fendy
 * @CreateTime 2024/5/5
 * @Description axios声明文件
 */
import 'axios'
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {
    data: T
    code: number
    msg: string
  }
}
