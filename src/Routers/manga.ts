import * as Fs from 'fs'
import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
import { scraper as mangakakalotScrapper } from '../Scrapper/mangakakalot'
import * as mangaseeInterface from '../Interfaces/Responses/mangasee'
import * as mangakakalotInterface from '../Interfaces/Responses/mangakaklot'
import * as mainInterface from '../Interfaces/Responses/main'
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
      .then((data: mainInterface.hotUpdates[]) => {
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
      .then((data: mangaseeInterface.latestUpRes[]) => {
        let res: mangaseeInterface.latestUpResMain = {
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
})

router.get('/:mangaId/chaps/:mangaName', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()
  let mangaName: string = request.params.mangaName.toString()
  mangaName = mangaName.replace(/[ ]/gm, '-')

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .getChaps(mangaName)
      .then((data: any) => {
        let res: mangaseeInterface.mangaDataRes = {
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
})

router.get('/:mangaId/manga-data', async (request: Request, response: Response) => {
  let chapterURL: string = request.query.chapterURL.toString()
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseesc: mangasee123Scrapper = new mangasee123Scrapper()
    if (chapterURL == null || chapterURL == '') {
      let resp: mangaseeInterface.mangaDataRes = {
        success: false,
        data: {}
      }
      return response.status(400).json(resp)
    }
    await mangaseesc
      .mangaData(chapterURL)
      .then((data: mangaseeInterface.mangaDataRes) => {
        response.status(201).json(data)
      })
      .catch((e: any) => {
        response.status(500).json(e)
      })
  }
})

router.get('/get-sources', async (request: Request, response: Response) => {
  let data = JSON.parse(Fs.readFileSync('./src/sources.json').toString())
  return response.json(data)
})

export default router