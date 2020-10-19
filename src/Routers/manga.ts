import * as Fs from 'fs'
import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
import { scraper as mangakakalotScrapper } from '../Scrapper/mangakakalot'
import * as mangaseeInterface from '../Interfaces/Responses/mangasee'
import * as mangakakalotInterface from '../Interfaces/Responses/mangakaklot'
import * as mainInterface from '../Interfaces/Responses/main'
import { json } from 'body-parser'
const router = Router()

router.get('/:mangaId/hot-updates', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .hotUpdates()
      .then((data: mainInterface.hotUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mangaseeInterface.hotUpResMain = {
          success: false,
          data: []
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalot = new mangakakalotScrapper()
    await mangakakalot
      .hotUpdates()
      .then((data: any) => { //data: mainInterface.hotUpdates[]
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.json(res)
      })
      .catch((e) => {
        let res: mangakakalotInterface.hotUpResMain = {
          success: false,
          data: []
        }
        response.status(500).json(res)
      })
  }

})

router.get('/:mangaId/latest-updates', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseeSc: mangasee123Scrapper = new mangasee123Scrapper()
    await mangaseeSc
      .latestUpdates()
      .then((data: mainInterface.latestUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mangaseeInterface.latestUpResMain = {
          success: false,
          data: []
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc: mangakakalotScrapper = new mangakakalotScrapper()
    await mangakakalotSc
      .latestUpdates()
      .then((data: mainInterface.latestUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mangakakalotInterface.hotUpResMain = {
          success: false,
          data: []
        }
        response.status(500).json(res)
      })
  }


})

router.get('/:mangaId/get-all', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .getAll()
      .then((data: mangaseeInterface.allRes[]) => {
        response.status(201).json({
          success: true,
          data: data
        })
      })
      .catch((e: any) => {
        response.status(500).json({
          success: false,
          data: []
        })
      })
  }
  else if (mangaId == '1') {
    response.status(503).json({
      success: false,
      error: "Unavailable for this source"
    })
  }

})

router.get('/:mangaId/search/', async (request: Request, response: Response) => {
  let keyWord: string = request.query.keyWord.toString()
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseesc: mangasee123Scrapper = new mangasee123Scrapper()
    await mangaseesc
      .search(keyWord)
      .then((data: mangaseeInterface.allRes[]) => {
        response.status(201).json({
          success: true,
          data: data
        })
      })
      .catch((e: any) => {
        response.status(500).json({
          success: false,
          data: []
        })
      })
  }
  if (mangaId == '1') {
    let mangakakalotsc: mangakakalotScrapper = new mangakakalotScrapper()
    await mangakakalotsc
      .search(keyWord)
      .then((data: mainInterface.searchResults[]) => {
        response.status(201).json({
          success: true,
          data: data
        })
      })
      .catch((e: any) => {
        response.status(500).json({
          success: false,
          error: e
        })
      })
  }



})

router.get('/:mangaId/chaps/:mangaName', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()
  let mangaName: string = request.params.mangaName.toString()
  mangaName = mangaName.replace(/[ ]/gm, '-')

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .getChaps(mangaName)
      .then((data: mainInterface.chapterResults[]) => {
        let res = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mangaseeInterface.chapsResMain = {
          success: false,
          data: []
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc = new mangakakalotScrapper()
    await mangakakalotSc
      .getChaps(mangaName)
      .then((data: any) => {
        response.json({
          success: true,
          data: data
        })
      })
      .catch((e) => {

      })
  }
})

router.get('/:mangaId/manga-data', async (request: Request, response: Response) => {
  let chapterURL: string = request.query.chapterURL.toString()
  let mangaId: string = request.params.mangaId.toString()
  if (chapterURL == null || chapterURL == '') {
    let resp = {
      success: false,
      data: {}
    }
    return response.status(400).json(resp)
  }
  if (mangaId == '0') {
    let mangaseesc: mangasee123Scrapper = new mangasee123Scrapper()
    await mangaseesc
      .mangaData(chapterURL)
      .then((data: mainInterface.chapterData) => {
        response.status(201).json({
          success: true,
          data: data
        })
      })
      .catch((e: any) => {
        response.status(500).json(e)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc = new mangakakalotScrapper()
    await mangakakalotSc
      .mangaData(chapterURL)
      .then((data: mainInterface.chapterData) => {
        response.json({
          success: true,
          data: data
        })
      })
      .catch((e) => {

      })
  }
})

router.get('/get-sources', async (request: Request, response: Response) => {
  let data = JSON.parse(Fs.readFileSync('./src/sources.json').toString())
  return response.json(data)
})

export default router