import * as axios from 'axios'
import * as Fs from 'fs'
import * as cheerio from 'cheerio'
import * as ss from 'string-similarity'
import { hotUpRes } from '../Interfaces/Responses/mangakaklot'
//  import {  } from '../Interfaces/Requests/mangakakalot'
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
    this.baseURL = "https://mangakakalot.com"
  }

  async hotUpdates(): Promise<hotUpRes[]> {
    let res: hotUpRes[] = []
    const url: string = this.baseURL + '/manga_list?type=topview&category=all&state=all&page='

    for (let i = 1; i < 6; i++) {
      await axios.default({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url + String(i)
      })
        .then((data: axios.AxiosResponse) => {
          try {
            var $ = cheerio.load(data.data, { xmlMode: true })
            $('.truyen-list').children('.list-truyen-item-wrap').each((index: number, elem: CheerioElement) => {
              let hotres: hotUpRes = {
                mangaURL: $('a', elem)[0].attribs.href,
                sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
                title: $('a', elem)[0].attribs.title,
                imageURL: $('img', elem).attr('src'),
                currentChapter: $('a', elem)[2].attribs.title,
                currentChapterURL: $('a', elem)[2].attribs.href,
                views: $('a', elem).next().next().next().text().split('\n')[1],
                summary: $('p', elem).text().split('\n')[1]
              }
              res.push(hotres)
            })
          }
          catch (e) {
            throw new Error(e)
          }
        })
        .catch((e: any) => {
          return Promise.reject(e.message)
        })

    }
    return res
  }


}

export { scraper }