import { Request, Response, Router } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
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
        response.status(201).json(data)
      })
      .catch((e: any) => {
        response.status(500).json(e)
      })
  }
})

router.get('/:mangaId/latest-updates', async (req: Request, res: Response) => {
  let mangaId = req.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseeSc = new mangasee123Scrapper()
    await mangaseeSc
      .latestUpdates()
      .then((data: any) => {
        res.status(201).json(data)
      })
      .catch((e: any) => {
        res.status(500).json(e)
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
        response.status(201).json(data)
      })
      .catch((e: any) => {
        response.status(500).json(e)
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
        response.status(201).json(data)
      })
      .catch((e: any) => {
        response.status(500).json(e)
      })
  }
})

router.get('/:mangaId/chaps/:mangaName', async (req: Request, res: Response) => {
  let mangaId: string = req.params.mangaId.toString()
  if (mangaId == '0') {
    let mangasee = new mangasee123Scrapper()
    await mangasee
      .getChaps(req.params.mangaName.toString())
      .then((data: any) => {
        res.status(201).json(data)
      })
      .catch((e: any) => {
        res.status(500).json(e)
      })
  }
})

router.get('/:mangaId/manga-data', async (request: Request, response: Response) => {
  let chapterURL: string = request.query.chapterURL.toString()
  let mangaId: string = request.params.mangaId.toString()

  if (mangaId == '0') {
    let mangaseesc = new mangasee123Scrapper()
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
