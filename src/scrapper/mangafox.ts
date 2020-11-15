import * as axios from 'axios'
import * as cheerio from 'cheerio'
import * as mainInterface from '../interfaces/responses/main'
import puppeteer from 'puppeteer'
import { parseChapNumber } from '../helpers/mangafox'
import * as Fs from 'fs'
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
            source: this.baseURL,
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

  async mangaData(chapterURL: string): Promise<mainInterface.chapterData> {
    let res: mainInterface.chapterData
    let browser: puppeteer.Browser
    try {
      browser = await puppeteer.launch({
        'args': [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      })
    } catch (error) {
      throw new Error(String(error))
    }
    const [page] = await browser.pages();
    page.setUserAgent('Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36')
    page.setDefaultTimeout(300000)
    await page.goto(chapterURL, { waitUntil: 'networkidle0' })
    var chapterLength = 0
    var appendingChar = ''
    var spanSections = await page.$$('.pager-list.cp-pager-list > .pager-list-left > span > a')
    var isSinglePage = spanSections.length > 0 ? false : true
    var isImageHyphenSpaced = false
    var nextChapterURLArray = await page.$$('.chapter')
    var chapterURLSet = new Set()
    var nextChapterURL: string | null
    var previousChapterURL: string | null
    var ctr = 0
    for (let chp of nextChapterURLArray) {
      await page.evaluate(el => el.getAttribute('href'), chp).then((url: string) => {
        chapterURLSet.add(url)
        if (ctr === 0) {
          previousChapterURL = this.baseURL + url
        } else if (ctr == 1 && chapterURLSet.size > 1) {
          nextChapterURL = this.baseURL + url
        }
        else if (ctr == 1 && chapterURLSet.size == 1) {
          nextChapterURL = null
        }
        ctr += 1
      })
    }
    var imageFiles: any = {}
    if (isSinglePage) {
      let imageTags = await page.$$('.reader-main-img')
      chapterLength = imageTags.length
      var count = 0
      for (let imageTag of imageTags) {
        await page.evaluate(el => el.getAttribute('data-src'), imageTag).then((imageLink: string) => {
          imageFiles[count] = imageLink.replace('//', '')
          count += 1
        })
      }
    }
    else {
      chapterLength = Number(await page.evaluate(() => document.querySelector('.pager-list-left span').textContent.replace(/\./g, '').split(' ').filter(Number).splice(-1)[0]))
      var imageLink = await page.evaluate(() => document.querySelector('.reader-main-img').getAttribute('src').split('?')[0])
      let imageLinkComponents = imageLink.split('/')
      var lastComponent = imageLinkComponents.slice(-1)[0]
      const imageFormat = lastComponent.split('.').splice(-1)[0]
      if (/_/gm.test(imageLinkComponents.slice(-1)[0])) {
        isImageHyphenSpaced = true
        for (let idx = 0; idx < chapterLength; idx++) {
          var splittedLastComponent = lastComponent.split('_')
          let imageNumber = String(Number(splittedLastComponent.splice(-1)[0].replace('.' + imageFormat, '')) + idx)
          splittedLastComponent.push(imageNumber + `.${imageFormat}`)
          imageLinkComponents.pop()
          imageLinkComponents.push(splittedLastComponent.join('_'))
          imageFiles[idx] = imageLinkComponents.join('/').replace('//', '')
        }
      } else {
        isImageHyphenSpaced = false
        appendingChar = lastComponent.replace('.' + imageFormat, '').replace(/[0-9]/g, '')
        imageLinkComponents.pop()
        let chpURL = imageLinkComponents.join('/')
        imageFiles = parseChapNumber(chapterLength, chpURL, appendingChar, imageFormat)
      }

    }
    res = {
      imageURL: imageFiles,
      chapterNumber: await page.$eval('.reader-header-title-2', e => e.textContent),
      mangaTitle: await page.$eval('.reader-header-title-1', e => e.textContent),
      nextChapter: nextChapterURL,
      previousChapter: previousChapterURL
    }
    console.log(res);

    await browser.close()
    return res
  }

  async getAll(): Promise<mainInterface.latestUpdates[]> {
    return JSON.parse(Fs.readFileSync('./public/mangafox-all.json').toString())
  }

  async scrapeAll() {
    var res: mainInterface.latestUpdates[] = []
    for (let idx = 1; idx <= 143; idx++) {
      let url = this.baseURL + '/directory/' + idx + '.html'
      await axios.default({
        url: url,
        headers: this.defaultHeaders,
        method: 'GET'
      })
        .then((data: axios.AxiosResponse) => {
          var $ = cheerio.load(data.data)
          $('.manga-list-1-list').children('li').each((_: number, element: cheerio.Element) => {
            let manga: mainInterface.latestUpdates = {
              title: $('a', element).attr('title'),
              imageURL: $('.manga-list-1-cover', element).attr('src'),
              source: this.baseURL,
              sourceSpecificName: $('a', element).attr('href').split('/').splice(-2)[0],
              currentChapter: $('.manga-list-1-item-subtitle', element).children('a').first().text(),
              currentChapterURL: this.baseURL + $('.manga-list-1-item-subtitle', element).children('a').first().attr('href'),
              additionalInfo: {
                rating: $('.item-score', element).text()
              }
            }
            res.push(manga)
          })
        })
        .catch((e: axios.AxiosError) => {
          throw new Error(e.message);
        })
    }
    Fs.writeFile('./public/mangafox-all.json', JSON.stringify(res), (e: NodeJS.ErrnoException) => {
      console.log("completed")
      if (e != null) {
        throw new Error(e.message)
      }
    })
  }
}

export { Scraper as mangafoxScraper }