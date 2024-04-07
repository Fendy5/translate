/**
 * @Author fendy
 * @CreateTime 2024/3/25 22:54
 * @Description
 */
import request from '@/utils/request.ts'

export const getVersionApi = () => request.get('/api/v1/check_update')
