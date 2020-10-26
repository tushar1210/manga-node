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

  async latestUpdates(): Promise<mainInterface.latestUpdates[]> {
    let res: mainInterface.latestUpdates[] = []
    await axios.default({
      url: this.baseURL + '/releases/',
      headers: this.defaultHeaders,
      method: 'GET'
    })
      .then((data: axios.AxiosResponse) => {
        var $ = cheerio.load(data.data)
        $('.manga-list-4-list').children('li').each((_: number, elem: cheerio.Element) => {
          let genreArray: string[] = $(elem).children('p').last().text().split(' ').filter(String)
          let latestUpdate: mainInterface.latestUpdates = {
            title: $(elem).children('a').attr('title'),
            imageURL: $(elem).children('a').children('img').attr('src'),
            source: this.baseURL,
            sourceSpecificName: $(elem).children('p').children('a').attr('href').split('/').splice(-2)[0],
            currentChapter: $(elem).children('ul').first().children().first().text(),
            currentChapterURL: this.baseURL + $(elem).children('ul').first().children().first().children('a').attr('href'),
            additionalInfo: {
              genres: genreArray
            }
          }
          res.push(latestUpdate)
        })

      })

    return res
  }

  async search(keyword: string): Promise<mainInterface.searchResults[]> {
    let res: mainInterface.searchResults[] = []
    await axios.default({
      url: this.baseURL + '/search',
      headers: this.defaultHeaders,
      method: 'GET',
      params: {
        title: keyword.replace(' ', '+')
      }
    })
      .then((data: axios.AxiosResponse) => {
        var $ = cheerio.load(data.data)
        $('.manga-list-4-list').children('li').each((_: number, element: cheerio.Element) => {
          let authors: string[] = []
          $(element).children('p').next().first().next().children('a').each((__: number, elem: cheerio.Element) => {
            authors.push($(elem).text())
          })
          let searchElement: mainInterface.searchResults = {
            title: $(element).children('a').attr('title'),
            sourceSpecificName: $(element).children('a').attr('href').split('/').filter(String).splice(-1)[0],
            imageURL: $(element).children('a').children('img').attr('src'),
            mangaURL: this.baseURL + $(element).children('a').attr('href'),
            additionalInfo: {
              status: $(element).children('p').next().first().text(),
              latestChapter: $(element).children('p').next().first().next().next().text(),
              author: authors,
              synopsis: $(element).children('p').last().text()
            }
          }
          res.push(searchElement)
        })
      })
      .catch((e: axios.AxiosError) => {

      })
    return res
  }

  async getChaps(mangaName: string): Promise<mainInterface.chapterResults[]> {
    let res: mainInterface.chapterResults[] = []
    let url: string = this.baseURL + `/manga/${mangaName}`
    await axios.default({
      url: url,
      headers: this.defaultHeaders,
      method: 'GET'
    })
      .then((data: axios.AxiosResponse) => {
        var $ = cheerio.load(data.data)
        $('.detail-main-list').children('li').each((_: number, elem: cheerio.Element) => {
          let chp = $(elem).children('a').children('div').children('p').first().text().split('-')
          let chapter: mainInterface.chapterResults = {
            link: this.baseURL + $(elem).children('a').attr('href'),
            chapterNumber: chp[0],
            chapterName: (chp.length == 2) ? chp[1] : '',
            type: '',
            date: $(elem).children('a').children('div').children('p').first().next().text()
          }
          res.push(chapter)
        })
      })
      .catch((e: axios.AxiosError) => {

      })
    return res
  }
}

export { Scraper as mangafoxScraper }