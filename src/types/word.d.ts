/**
 * @Author fendy
 * @CreateTime 2024/3/3 00:16
 * @Description
 */
import React from 'react'

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

export type WordSectionProp = {
  title: string
  data: WordProp[]
}

export type ReviewCustomProp = {
  start_date: string
  end_date: string
}

export type WordCardProps = React.ComponentProps & {
  word: WordProp
  isPlaying: boolean
  primaryBtn?: (text: string, index: number) => void
  secondaryBtn?: (text: string, index: number) => void
  playSound: (text: string) => void
  playLoop: (text: string) => void
  stopPlay?: () => void
}

export type ProficiencyProp = {
  origin_text: string
  update_type?: string
  count_internal?: number
}
