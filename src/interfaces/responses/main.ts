export interface response {
  success: boolean,
  data?: chapterData[] | chapterResults[] | searchResults[] | latestUpdates[] | hotUpdates[] | any,
  error?: string,
  errorMessage?: string,
  dataLength?: number
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
  source: string
  additionalInfo?: any
}

export interface chapterResults {
  link: string
  chapterNumber: string
  type: string | null
  date: string
  chapterName: string
}

export interface chapterData {
  imageURL: any
  chapterNumber: string | null,
  mangaTitle: string | null,
  nextChapter?: string,
  previousChapter?: string
}
