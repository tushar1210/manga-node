import * as Fs from 'fs'
import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
import { scraper as mangakakalotScrapper } from '../Scrapper/mangakakalot'
import { mangaDataRes, hotUpRes, hotUpResMain, latestUpRes, latestUpResMain, chapsResMain, allRes } from '../Interfaces/Responses/mangasee'
import * as mangakakalotInterface from '../Interfaces/Responses/mangakaklot'
const router = Router()

router.get('/:mangaId/hot-updates', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .hotUpdates()
      .then((data: hotUpRes[]) => {
        let res: hotUpResMain = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: hotUpResMain = {
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
      .then((data: mangakakalotInterface.hotUpRes[]) => {
        let res: mangakakalotInterface.hotUpResMain = {
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
      .then((data: latestUpRes[]) => {
        let res: latestUpResMain = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: latestUpResMain = {
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
      .then((data: allRes[]) => {
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
      .then((data: allRes[]) => {
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
        let res: mangaDataRes = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: chapsResMain = {
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
      let resp: mangaDataRes = {
        success: false,
        data: {}
      }
      return response.status(400).json(resp)
    }
    await mangaseesc
      .mangaData(chapterURL)
      .then((data: mangaDataRes) => {
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