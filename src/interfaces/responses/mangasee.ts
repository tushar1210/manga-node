import { allChapterInfoReq, curChapterReq } from '../requests/mangasee'
export interface hotUpRes {
  id: string
  source: string
  sourceSpecificName: string
  mangaName: string
  imageURL: string
  date: string
  currentChapter: string
  ended: boolean
}

export interface hotUpResMain {
  success: boolean
  data: hotUpRes[]
}

export interface latestUpRes {
  id: string
  source: string
  sourceSpecificName: string
  mangaName: string
  genres: string
  scanStatus: string
  date: string
  newChapter: string
  ended: boolean
}

export interface latestUpResMain {
  success: boolean
  data: latestUpRes[]
}

export interface allRes {
  source: string
  mangaName: string
  imageURL: string
  mangaURL: string
  sourceSpecificName: string
  alternateNames: string[]
}

export interface chapsRes {
  link: string
  chapterNumber: string
  type: string
  date: string
  chapterName: string
}

export interface chapsResMain {
  success: boolean
  data: chapsRes[]
}

export interface mangaDataRes {
  data: {
    imageURL?: {
      Sno?: string
      url?: string
    } | any
    path?: string
    currentChapter?: curChapterReq
  }
}