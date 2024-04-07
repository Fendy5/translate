import { PageProp } from '@/types/common'
import request from '@/utils/request.ts'

/**
 * @Author fendy
 * @CreateTime 2024/3/10 22:03
 * @Description
 */
export const getWordListApi = (params: PageProp) => request.get('/api/v1/words', { params })

export const getWordOverviewApi = () => request.get('/api/v1/words/get_word_overview')
