import express from "express"
import { scraper as mangasee123Scrapper } from './scrapper/mangasee123'
import { scraper as mangakakalotScrapper } from './scrapper/mangakakalot'
import { mangafoxScraper } from './scrapper/mangafox'
import mangaRouter from './routers/manga'
import * as UserRoutes from './routers/user'
import cron from 'node-cron'
const path = require('path')
import { json, urlencoded } from 'body-parser'

require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()
const mangasee123sc = new mangasee123Scrapper()
const mangakakalotsc = new mangakakalotScrapper()
const mangafoxsc = new mangafoxScraper()
app.set('json spaces', 4)

app.use(json())
app.use(urlencoded({
  extended: false
}))

app.use('/manga', mangaRouter)

UserRoutes.routes(app)

app.use("/", (request: express.Request, response: express.Response) => {
  response.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => {
  console.log("Server's on @" + PORT)
  cron.schedule('0 0 0 * * *', () => {
    mangasee123sc.all()
    mangakakalotsc.scrapeAll()
    mangafoxsc.scrapeAll()
  })
})
