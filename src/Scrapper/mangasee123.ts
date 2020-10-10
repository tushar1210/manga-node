import * as axios from 'axios'
import * as Fs from 'fs'
import * as cheerio from 'cheerio'
import * as ss from 'string-similarity'
import { parseChapNumber, chapToken } from '../helpers/mangasee'
import { latestUpRes, allRes, mangaDataRes, chapsRes } from '../Interfaces/Responses/mangasee'
import { hotUpReq, latestUpReq, allReq, curChapterReq, allChapterInfoReq, chapsReq } from '../Interfaces/Requests/mangasee'
import * as mainInterface from '../Interfaces/Responses/main'

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

  async hotUpdates(): Promise<mainInterface.hotUpdates[]> {
    let res: mainInterface.hotUpdates[] = []
    const url: string = this.baseURL

    await axios.default
      .request({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: axios.AxiosResponse<any>) => {
        let str: any, $ = cheerio.load(data.data, { xmlMode: true })
        try {
          str = $('script:not([src])')[6].children[0].data?.toString()
        }
        catch (e) {
          throw new Error(e)
        }

        let parse: RegExpMatchArray = str?.match(/vm.HotUpdateJSON = (\[.*?\])/)
        let valid: hotUpReq[] = JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1])
        const imageBaseURL: string = "https://cover.mangabeast01.com/cover/"

        valid.forEach((element: hotUpReq) => {
          let updateResponse: mainInterface.hotUpdates = {
            title: element.SeriesName,
            sourceSpecificName: element.IndexName,
            imageURL: imageBaseURL + element.IndexName + '.jpg',
            source: this.baseURL,
            currentChapter: parseChapNumber(element.Chapter),
            additionalInfo: {
              id: element.SeriesID,
              date: element.Date,
              ended: element.IsEdd
            }

          }
          res.push(updateResponse)
        })
      })
      .catch((e: any) => {
        return Promise.reject(e.message)
      })
    return res
  }

  async latestUpdates(): Promise<latestUpRes[]> {
    let res: latestUpRes[] = []
    const url: string = this.baseURL

    await axios.default
      .request({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: axios.AxiosResponse<any>) => {
        let str: any, $ = cheerio.load(data.data, { xmlMode: true })
        try {
          str = $('script:not([src])')[6].children[0].data?.toString()
        }
        catch (e) {
          throw new Error(e)
        }
        let parse: RegExpMatchArray = str?.match(/vm.LatestJSON = (\[.*?\])/)
        let valid: latestUpReq[] = JSON.parse(parse[0].split('vm.LatestJSON = ')[1])

        valid.forEach((element: latestUpReq) => {
          let mangaData: latestUpRes = {
            id: element.SeriesID,
            sourceSpecificName: element.IndexName,
            source: 'https://mangasee123.com/',
            mangaName: element.SeriesName,
            genres: element.Genres,
            date: element.Date,
            newChapter: parseChapNumber(element.Chapter),
            scanStatus: element.ScanStatus,
            ended: element.IsEdd
          }
          res.push(mangaData)
        })
        return res
      })
      .catch((e: any) => {
        return Promise.reject(res)
      })
    return res
  }

  async all() {
    const url: string = this.baseURL + "/_search.php"

    await axios.default
      .request({
        method: 'POST',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: axios.AxiosResponse<any>) => {
        let valid: allReq[] = data.data
        let res: allRes[] = []
        const imageBaseURL: string = "https://cover.mangabeast01.com/cover/"

        valid.forEach((element: allReq) => {
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
        return Promise.reject(e.message)
      })
  }

  async getAll(): Promise<allRes[]> {
    let data: allRes[] = JSON.parse(Fs.readFileSync('./temp/mangasee123-all.json').toString())
    return data
  }

  async search(keyWord: string): Promise<allRes[]> {
    let data: allRes[] = await this.getAll()
    let res: allRes[] = []
    data.forEach((element: allRes) => {
      if (ss.compareTwoStrings(keyWord.toLowerCase(), element.mangaName.toLowerCase()) > 0.4 || ss.compareTwoStrings(keyWord.toLowerCase(), element.sourceSpecificName.toLowerCase()) > 0.5) {
        res.push(element)
      }
    })
    res.reverse()
    return res
  }

  async getChaps(mangaName: string): Promise<chapsRes[]> {
    let res: chapsRes[] = []
    let mangaNameR: string = mangaName.replace("/\s/", "-")
    const url: string = this.baseURL + "/manga/" + mangaNameR

    await axios.default
      .request({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url
      })
      .then((data: axios.AxiosResponse<any>) => {
        let str: any, $ = cheerio.load(data.data, { xmlMode: true })
        try {
          str = $('script:not([src])')[5].children[0].data?.toString()
        }
        catch (e) {
          throw new Error(e)
        }
        let parse: RegExpMatchArray = str?.match(/vm.Chapters = (\[.*?\])/)
        let valid: chapsReq[] = JSON.parse(parse[0].split('vm.Chapters = ')[1])

        valid.forEach((element: chapsReq) => {
          let mangaData: chapsRes = {
            chapterNumber: parseChapNumber(element.Chapter),
            link: "https://mangasee123.com/read-online/" + mangaNameR + "-chapter-" + parseChapNumber(element.Chapter) + chapToken(element.Chapter) + ".html",
            type: element.Type,
            date: element.Date,
            chapterName: element.ChapterName
          }
          res.push(mangaData)
        })
        return res
      })
      .catch((e: any) => {
        return Promise.reject(e.message)
      })
    return res
  }

  async mangaData(chapterURL: string): Promise<mangaDataRes> {
    let url: string = chapterURL
    var final: mangaDataRes
    await axios.default.request({
      method: 'GET',
      url: url,
      headers: this.defaultHeaders
    })
      .then((data: axios.AxiosResponse<any>) => {
        let str: any, $ = cheerio.load(data.data, { xmlMode: true })
        if ($('script:not([src])').length != 6) {
          throw new Error("Illegal chapterURL")
        }
        str = $('script:not([src])')[5].children[0].data?.toString()
        let path: string = str?.match(/vm.CurPathName = (\".*?\")/)[1].split(/"*"/)[1]
        let curChapter: curChapterReq = JSON.parse(str?.match(/vm.CurChapter = (\{.*?\})/)[1])
        let allChaptersReq: allChapterInfoReq[] = JSON.parse(str?.match(/vm.CHAPTERS = (\[.*?\])/)[1])
        let sourceSpecificName: any = str?.match(/vm.IndexName = (\".*?\")/)[1].split(/"*"/)[1]
        let chpNum: number = Number(curChapter.Page)
        let chpPath: string = curChapter.Chapter.substring(1, 5)

        if (curChapter.Chapter[5] != '0') {
          chpPath += '.'
          for (let i = 5; i < curChapter.Chapter.length; i++) {
            chpPath += curChapter.Chapter[i]
          }
        }

        let imgURL: string = ''

        if (curChapter.Directory == '') {
          imgURL = `https://${path}/manga/${sourceSpecificName}/${chpPath}-`
        }
        else {
          imgURL = `https://${path}/manga/${sourceSpecificName}/${curChapter.Directory}/${chpPath}-`
        }

        let imageDict: any = {}

        for (let index = 1; index <= chpNum; index++) {
          let chpURL: string = imgURL
          if (index >= 1 && index <= 9) {
            chpURL += '00' + index.toString()
          }
          else if (index >= 10 && index <= 99) {
            chpURL += '0' + index.toString()
          }
          else {
            chpURL += index.toString()
          }
          chpURL += '.png'
          let i: string = index.toString()
          imageDict[i] = chpURL
        }
        let res: mangaDataRes = {
          success: true,
          data: {
            path: path,
            imageURL: imageDict,
            allChapters: allChaptersReq,
            currentChapter: curChapter
          }
        }
        final = res
      })
      .catch((e: any) => {
        let res: mangaDataRes = {
          success: false,
          data: {}
        }
        final = res
        return Promise.reject(res)
      })
    return final
  }
}

export { scraper }