export interface hotUpRes {
  mangaURL: string
  title: string
  sourceSpecificName: string
  imageURL: string
  currentChapter: string
  currentChapterURL: string
  views: string
  summary: string
}

export interface hotUpResMain {
  success: boolean
  data: hotUpRes[]
}