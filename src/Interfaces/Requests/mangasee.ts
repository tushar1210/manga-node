export interface hotUpReq {
  SeriesID: string
  IndexName: string
  SeriesName: string
  Date: string
  Chapter: string
  IsEdd: boolean
}

export interface latestUpReq {
  SeriesID: string
  IndexName: string
  SeriesName: string
  Date: string
  Chapter: string
  IsEdd: boolean
  Genres: string
  ScanStatus: string
}

export interface allReq {
  i: string
  s: string
  a: string[]
}


export interface chapsReq {
  link: string
  Chapter: string
  Type: string
  Date: string
  ChapterName: string
}

export interface allChapterInfoReq {
  Chapter: string
  Type: string
  Page: string
  Directory: string
  Date: string
  ChapterName: string
}

export interface curChapterReq {
  Chapter: string
  Type: string
  Page: string
  Directory: string
  Date: string
  ChapterName: string | null
}
