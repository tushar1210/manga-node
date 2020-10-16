import * as cheerio from 'cheerio'
import * as axios from 'axios'
import * as mainInterface from '../Interfaces/Responses/main'

export function scrape(data: axios.AxiosResponse): mainInterface.hotUpdates[] {
  let res: mainInterface.hotUpdates[] = []
  var $ = cheerio.load(data.data, { xmlMode: true })

  $('.truyen-list').children('.list-truyen-item-wrap').each((index: number, elem: cheerio.Element) => {
    let hotUpdate: mainInterface.hotUpdates = {
      title: $('a', elem)[0].attribs.title,
      sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
      imageURL: $('img', elem).attr('src'),
      source: 'https://mangakakalot.com',
      currentChapter: $('a', elem)[2].attribs.title,
      currentChapterURL: $('a', elem)[2].attribs.href,
      additionalInfo: {
        views: $('a', elem).next().next().next().text().split('\n')[1],
        summary: $('p', elem).text().split('\n')[1],
        mangaURL: $('a', elem)[0].attribs.href
      }
    }
    res.push(hotUpdate)
  })
  return res
}

export function stripTags(html: string): string {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent;
}