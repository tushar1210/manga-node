export interface searchMangaEden{
    label:string,
    url:string,
    value:string
}
export interface searchKissMangaData{
    title:string,
    url:string,
    type:string
}
export interface searchKissManga{
    success:string,
    data?:searchKissMangaData[]
}