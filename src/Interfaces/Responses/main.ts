export interface response {
  success: boolean
  data: hotUpdates[] | latestUpdates[]
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

export interface latestUpdates {
  title: string
  sourceSpecificName: string
  imageURL: string
  source: string
  currentChapter: string
  currentChapterURL?: string
  additionalInfo?: any
}

export interface searchResults {
  title: string
  sourceSpecificName: string
  imageURL: string
  mangaURL: string
  additionalInfo?: any
}