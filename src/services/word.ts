import { PageProp } from '@/types/common'
import request from '@/utils/request.ts'
import { ReviewCustomProp } from '@/types/word'

/**
 * @Author fendy
 * @CreateTime 2024/3/10 22:03
 * @Description
 */
export const getWordListApi = (params: PageProp) => request.get('/api/v1/words', { params })

export const getWordOverviewApi = () => request.get('/api/v1/get_word_overview')

export const getReviewApi = (type: string, params: PageProp & Partial<ReviewCustomProp>) =>
  request.get(`/api/v1/review/${type}`, { params })
