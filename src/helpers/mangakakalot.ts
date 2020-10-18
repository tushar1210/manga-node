import * as cheerio from 'cheerio'
import * as axios from 'axios'
import * as mainInterface from '../Interfaces/Responses/main'

export function scrapeHotUpdates(data: axios.AxiosResponse): mainInterface.hotUpdates[] {
  let res: mainInterface.hotUpdates[] = []
  var $ = cheerio.load(data.data, { xmlMode: true })
  $('.panel-content-genres').children().each((_: number, elem: cheerio.Element) => {
    let hotUpdateItem: mainInterface.hotUpdates = {
      title: $('a', elem).attr('title'),
      imageURL: $('img', elem).attr('src'),
      source: 'manganelo.com',
      sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
      currentChapter: $('div', elem).children('a').first().text(),
      currentChapterURL: $('div', elem).children('a').attr('href'),
      additionalInfo: {
        rating: $('em', elem).text(),
        views: $('.genres-item-view', elem).html(),
        date: $('.genres-item-time', elem).html(),
        author: $('.genres-item-author', elem).html(),
        description: $('.genres-item-description', elem).text().replace(/<[^>]*>?/gm, ''),
        mangaURL: $('a', elem).attr('href')
      }
    }
    res.push(hotUpdateItem)
  })
  return res
}

export function scrapeLatestUpdates(data: axios.AxiosResponse): mainInterface.latestUpdates[] {
  let res: mainInterface.latestUpdates[] = []
  var $ = cheerio.load(data.data, { xmlMode: true })
  $('.panel-content-genres').children().each((_: number, elem: cheerio.Element) => {
    let hotUpdateItem: mainInterface.latestUpdates = {
      title: $('a', elem).attr('title'),
      imageURL: $('img', elem).attr('src'),
      source: 'manganelo.com',
      sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
      currentChapter: $('div', elem).children('a').first().text(),
      currentChapterURL: $('div', elem).children('a').attr('href'),
      additionalInfo: {
        rating: $('em', elem).text(),
        views: $('.genres-item-view', elem).html(),
        date: $('.genres-item-time', elem).html(),
        author: $('.genres-item-author', elem).html(),
        description: $('.genres-item-description', elem).text().replace(/<[^>]*>?/gm, '').replace('\n', ''),
        mangaURL: $('a', elem).attr('href')
      }
    }
    res.push(hotUpdateItem)
  })
  return res
}


