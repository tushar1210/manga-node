import * as axios from 'axios'
import * as cheerio from 'cheerio'
import * as mainInterface from '../Interfaces/Responses/main'
import * as helpers from '../helpers/mangakakalot'
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

  async hotUpdates(): Promise<mainInterface.hotUpdates[]> {
    let res: mainInterface.hotUpdates[] = []
    const url: string = this.baseURL + '/manga_list?type=topview&category=all&state=all&page='

    for (let i = 1; i < 4; i++) {
      await axios.default({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url + String(i)
      })
        .then((data: axios.AxiosResponse) => {
          try {
            res = helpers.scrape(data)
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

  async latestUpdates(): Promise<mainInterface.latestUpdates[]> {
    var res: mainInterface.latestUpdates[] = []
    const url: string = this.baseURL + '/manga_list?type=latest&category=all&state=all&page='
    for (let i = 1; i < 4; i++) {
      await axios.default({
        method: 'GET',
        headers: this.defaultHeaders,
        url: url + String(i)
      })
        .then((data: axios.AxiosResponse) => {
          try {
            res = helpers.scrape(data)
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