import { Request, Response, Router, json } from 'express'
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
            .then(dat => {
                response.json(dat)
            })
            .catch(e => {
                response.status(500).json(e)
            })
    }
})

export default router