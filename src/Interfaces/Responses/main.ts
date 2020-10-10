export interface res {
  success: boolean
  data: any | hotUpdates
}

export interface hotUpdates {
  title: string
  sourceSpecificName: string
  imageURL: string
  source: string
  currentChapter: string
  currentChapterLink?: string
  additionalInfo: any
}