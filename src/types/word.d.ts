/**
 * @Author fendy
 * @CreateTime 2024/3/3 00:16
 * @Description
 */

export type WordCellProp = {
  date: string
  words: WordProp[]
}

export type WordProp = {
  id: number
  origin_text: string
  create_time: string
  phonetic_symbol: string
  translation_text: string
  dictionaries: DictionaryProp[]
}

export type DictionaryProp = {
  id: number
  annotation: string
}

export type OverViewProp = {
  today: string | '--'
  total: string | '--'
  month: string | '--'
  week: string | '--'
}

export type ReviewCustomProp = {
  start_date: string
  end_date: string
}
