import * as axios from 'axios'
import * as Fs from 'fs'
import * as cheerio from 'cheerio'
import * as ss from 'string-similarity'
import { hotUpRes, latestUpRes, allRes } from '../Interfaces/OpenManga/Responses/mangasee'
import { hotUpReq, latestUpReq, allReq } from '../Interfaces/OpenManga/Requests/mangasee'

class scraper {
  defaultHeaders: object
  baseURL: string
  constructor() {
    this.defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
      'DNT': '1',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json, text/javascript, */* q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8'
    }
    this.baseURL = "https://mangasee123.com"
  }

  async hotUpdates(): Promise<hotUpRes[]> {
    let res: hotUpRes[] = []
    const url = this.baseURL
    await axios.default
      .request({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: any) => {
        let str, $ = cheerio.load(data.data, { xmlMode: true })
        str = $('script:not([src])')[6].children[0].data?.toString()
        let parse = str?.match(/vm.HotUpdateJSON = (\[.*?\])/)
        let valid: hotUpReq[] = JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1])

        const imageBaseURL = "https://cover.mangabeast01.com/cover/"
        valid.forEach(element => {
          let mangaData: hotUpRes = {
            id: element.SeriesID,
            sourceSpecificName: element.IndexName,
            source: 'https://mangasee123.com/',
            mangaName: element.SeriesName,
            imageURL: imageBaseURL + element.IndexName + '.jpg',
            date: element.Date,
            currentChapter: element.Chapter.substring(2, 5),
            ended: element.IsEdd
          }
          res.push(mangaData)
        })
        return res
      })
      .catch((e: any) => {
        return res
      })
    return res
  }

  async latestUpdates(): Promise<latestUpRes[]> {
    let res: latestUpRes[] = []
    const url = this.baseURL

    await axios.default
      .request({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: any) => {
        let str, $ = cheerio.load(data.data, { xmlMode: true })
        str = $('script:not([src])')[6].children[0].data?.toString()

        let parse = str?.match(/vm.LatestJSON = (\[.*?\])/)
        let valid: latestUpReq[] = JSON.parse(parse[0].split('vm.LatestJSON = ')[1])

        valid.forEach(element => {
          let mangaData: latestUpRes = {
            id: element.SeriesID,
            sourceSpecificName: element.IndexName,
            source: 'https://mangasee123.com/',
            mangaName: element.SeriesName,
            genres: element.Genres,
            date: element.Date,
            newChapter: element.Chapter.substring(2, 5),
            scanStatus: element.ScanStatus,
            ended: element.IsEdd
          }
          res.push(mangaData)
        })
        return res
      })
      .catch((e: any) => {
        return res
      })
    return res
  }

  async all() {
    const url: string = this.baseURL + "/_search.php"
    let res: allRes[] = []
    await axios.default
      .request({
        method: 'POST',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: any) => {
        var valid: allReq[] = data.data
        var res: allRes[] = []
        const imageBaseURL = "https://cover.mangabeast01.com/cover/"
        valid.forEach(element => {
          let obj: allRes = {
            imageURL: imageBaseURL + element.i + '.jpg',
            mangaURL: this.baseURL + '/manga/' + element.i,

            source: 'https://mangasee123.com',
            mangaName: element.s,
            sourceSpecificName: element.i,
            alternateNames: element.a
          }
          res.push(obj)
        })
        Fs.writeFileSync('./temp/mangasee123-all.json', JSON.stringify(res))
      })
      .catch((e: any) => {
        return
      })
  }

  async getAll(): Promise<allRes[]> {
    let data: allRes[] = JSON.parse(Fs.readFileSync('./temp/mangasee123-all.json').toString())
    return data
  }

  async search(keyWord: string): Promise<allRes[]> {
    let data: allRes[] = await this.getAll()
    let res: allRes[] = []
    data.forEach(element => {
      if (ss.compareTwoStrings(keyWord.toLowerCase(), element.mangaName.toLowerCase()) > 0.4 || ss.compareTwoStrings(keyWord.toLowerCase(), element.sourceSpecificName.toLowerCase()) > 0.5) {
        res.push(element)
      }
    })
    return res
  }
}

export { scraper }
