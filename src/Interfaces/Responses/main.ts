export interface response {
  success: boolean
  data: any | hotUpdates
}

export interface hotUpdates {
  title: string
  sourceSpecificName: string
  imageURL: string
  source: string
  currentChapter: string
  currentChapterURL?: string
  additionalInfo?: any
}
