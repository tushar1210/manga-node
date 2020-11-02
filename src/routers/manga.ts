import * as Fs from 'fs'
import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../scrapper/mangasee123'
import { scraper as mangakakalotScrapper } from '../scrapper/mangakakalot'
import { mangafoxScraper } from '../scrapper/mangafox'
import * as mangaseeInterface from '../interfaces/responses/mangasee'
import * as mainInterface from '../interfaces/responses/main'
const router = Router()

router.get('/:mangaId/hotupdates', async (request: Request, response: Response) => {
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
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalot = new mangakakalotScrapper()
    await mangakakalot
      .hotUpdates()
      .then((data: any) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '2') {
    let mangafoxSc: mangafoxScraper = new mangafoxScraper()
    await mangafoxSc
      .hotUpdates()
      .then((data: mainInterface.hotUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }

})

router.get('/:mangaId/latestupdates', async (request: Request, response: Response) => {
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
        let res: mainInterface.response = {
          success: false,
          error: e
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
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '2') {
    let mangafoxSc = new mangafoxScraper()
    await mangafoxSc
      .latestUpdates()
      .then((data: mainInterface.latestUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: true,
          error: e
        }
        response.status(500).json(res)
      })
  }

})

router.get('/:mangaId/getall', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .getAll()
      .then((data: mangaseeInterface.allRes[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc = new mangakakalotScrapper()
    await mangakakalotSc.
      getAll()
      .then((data: mainInterface.latestUpdates[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
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
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  if (mangaId == '1') {
    let mangakakalotsc: mangakakalotScrapper = new mangakakalotScrapper()
    await mangakakalotsc
      .search(keyWord)
      .then((data: mainInterface.searchResults[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  if (mangaId == '2') {
    let mangafoxSc: mangafoxScraper = new mangafoxScraper()
    await mangafoxSc
      .search(keyWord)
      .then((data: mainInterface.searchResults[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }


})

router.get('/:mangaId/chapters/:mangaName', async (request: Request, response: Response) => {
  let mangaId: string = request.params.mangaId.toString()
  let mangaName: string = request.params.mangaName.toString()
  mangaName = mangaName.replace(/[ ]/gm, '-')

  if (mangaId == '0') {
    let mangasee: mangasee123Scrapper = new mangasee123Scrapper()
    await mangasee
      .getChaps(mangaName)
      .then((data: mainInterface.chapterResults[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc = new mangakakalotScrapper()
    await mangakakalotSc
      .getChaps(mangaName)
      .then((data: any) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '2') {
    let mangafoxSc: mangafoxScraper = new mangafoxScraper()
    await mangafoxSc
      .getChaps(mangaName)
      .then((data: mainInterface.chapterResults[]) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
})

router.get('/:mangaId/mangadata', async (request: Request, response: Response) => {
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
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e: any) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '1') {
    let mangakakalotSc = new mangakakalotScrapper()
    await mangakakalotSc
      .mangaData(chapterURL)
      .then((data: mainInterface.chapterData) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
  else if (mangaId == '2') {
    let mangafoxSc: mangafoxScraper = new mangafoxScraper()
    await mangafoxSc
      .mangaData(chapterURL)
      .then((data: mainInterface.chapterData) => {
        let res: mainInterface.response = {
          success: true,
          data: data
        }
        response.status(201).json(res)
      })
      .catch((e) => {
        let res: mainInterface.response = {
          success: false,
          error: e
        }
        response.status(500).json(res)
      })
  }
})

router.get('/sources', async (request: Request, response: Response) => {
  let data = JSON.parse(Fs.readFileSync('./public/sources.json').toString())
  return response.json(data)
})

export default router