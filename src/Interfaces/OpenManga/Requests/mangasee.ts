export interface hotUpdates {
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