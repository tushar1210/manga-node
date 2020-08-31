import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
import { mangaDataRes, hotUpResMain, latestUpResMain, chapsResMain } from '../Interfaces/Responses/mangasee'
const router = Router()

const sources = {
  0: "https://mangasee123.com"
}

router.get('/:mangaId/hot-updates', async (request: Request, response: Response) => {
  let mangaId = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangasee = new mangasee123Scrapper()
    await mangasee
      .hotUpdates()
      .then((data: any) => {
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
})

router.get('/:mangaId/latest-updates', async (request: Request, response: Response) => {
  let mangaId = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseeSc = new mangasee123Scrapper()
    await mangaseeSc
      .latestUpdates()
      .then((data: any) => {
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
  let mangaId = request.params.mangaId.toString()
  if (mangaId == '0') {
    let mangasee = new mangasee123Scrapper()
    await mangasee
      .getAll()
      .then((data: any) => {
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
    let mangaseesc = new mangasee123Scrapper()
    await mangaseesc
      .search(keyWord)
      .then((data: any) => {
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
  let mangaName = request.params.mangaName.toString()
  mangaName = mangaName.replace(/[ ]/gm, '-')
  if (mangaId == '0') {
    let mangasee = new mangasee123Scrapper()
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
    let mangaseesc = new mangasee123Scrapper()
    if (chapterURL == null || chapterURL == '') {
      let resp: mangaDataRes = {
        success: false,
        data: {}
      }
      return response.status(400).json(resp)
    }
    await mangaseesc
      .mangaData(chapterURL)
      .then((data: any) => {
        response.status(201).json(data)
      })
      .catch((e: any) => {
        response.status(500).json(e)
      })
  }

})




export default router
