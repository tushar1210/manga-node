import * as axios from 'axios'
import * as cheerio from 'cheerio'
import * as mainInterface from '../interfaces/responses/main'

class Scraper {
  defaultHeaders: object
  baseURL: string
  constructor() {
    this.defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
      'DNT': '1',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json, text/javascript, */* q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    this.baseURL = "https://fanfox.net"
  }

  async hotUpdates(): Promise<mainInterface.hotUpdates[]> {
    let res: mainInterface.hotUpdates[] = []
    await axios.default({
      url: this.baseURL + '/hot/',
      headers: this.defaultHeaders,
      method: 'GET'
    })
      .then((data: axios.AxiosResponse) => {
        var $ = cheerio.load(data.data)
        $('.manga-list-1-list').children('li').each((_: number, elem: cheerio.Element) => {
          var chapterDetailsArray = $('p', elem).next().text().split('      ')
          let hotUpdate: mainInterface.hotUpdates = {
            title: $('a', elem).attr('title'),
            imageURL: $('a', elem).children('img').attr('src'),
            source: this.baseURL,
            sourceSpecificName: $('a', elem).attr('href').replace('/manga/', '').replace('/', ''),
            currentChapter: chapterDetailsArray[0],
            currentChapterURL: this.baseURL + $('p', elem).next().children('a').attr('href'),
            additionalInfo: {
              rating: chapterDetailsArray[1]
            }
          }
          res.push(hotUpdate)
        })
      })
      .catch((e: axios.AxiosError) => {

      })
    return res
  }
}

export { Scraper as mangafoxScraper }