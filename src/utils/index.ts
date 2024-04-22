import { WordCellProp, WordProp } from '@/types/word'

/**
 * @Author fendy
 * @CreateTime 2024/3/10 00:32
 * @Description
 */
export const getWordCells = (words: WordProp[]) => {
  const res: WordCellProp[] = []
  if (words.length > 0) {
    let currentDate = getDateFromTime(words[0].create_time)
    let cell: WordCellProp = { date: currentDate, words: [] }
    for (const word of words) {
      if (getDateFromTime(word.create_time) === currentDate) {
        cell.words.push(word)
      } else {
        res.push(cell)
        currentDate = getDateFromTime(word.create_time)
        cell = { date: currentDate, words: [word] }
      }
    }
    res.push(cell)
  }
  return res
}

export const getDateFromTime = (time: string) => {
  return time.split(' ')[0]
}

/**
 * @desc 日期格式化
 * @param date
 * @return 2024-01-01
 */
export const formatDate = (date: Date) => date.toISOString().slice(0, 10)
