export interface mangaList {
    success?:boolean,
    id?:string,
    title?:string,
    link?:string,
    thumbnail?:string,
    lastChapter?:string,
    lastChapterDate?:string,
    lastChapterLink?:string,
    category?:string[]
    error?:string
}

export interface searchResult{
    success?:boolean,
    id?:string,
    title?:string,
    url?:string,
    error?:string
}