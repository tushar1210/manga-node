import { Request, Response, Router, json } from 'express'
import { scraper as mangasee123Scrapper } from '../Scrapper/mangasee123'
import { request } from 'http'

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
            .then(data => {
                response.json(data)
            })
            .catch(e => {
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
            .then(data => {
                res.json(data)
            })
            .catch(e => {
                console.log(e)
                res.status(400).status(e)
            })
    }
})

router.get('/:mangaId/get-all', async (request: Request, response: Response) => {
    let mangaId = request.params.mangaId.toString()
    if (mangaId == '0') {
        let mangasee = new mangasee123Scrapper()
        await mangasee
            .getAll()
            .then(data => {
                response.json(data)
            })
            .catch(e => {
                response.status(500).json(e)
            })
    }

})

router.get('/:mangaId/search/',async(request: Request, response: Response)=>{
    let keyWord=request.query.keyWord.toString()
    let mangaId = request.params.mangaId.toString()
    if(mangaId=='0'){
        let mangaseesc = new mangasee123Scrapper()
        await mangaseesc
            .search(keyWord)
            .then(data =>{
                response.json(data)
            })
            .catch(e=>[
                response.json(e)
            ])
    }

})

export default router