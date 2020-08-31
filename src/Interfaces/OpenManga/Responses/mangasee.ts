import {allChapterInfoReq, curChapterReq} from '../Requests/mangasee'
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
export interface mangaDataRes{
  imageURL:any
  path:string
  allChapters:allChapterInfoReq[]
  currentChapter:curChapterReq

}