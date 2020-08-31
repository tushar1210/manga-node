import express from "express"
import { scraper } from './Scrapper/mangasee123'
import mangaRouter from './Routers/manga'
import * as UserRoutes from './Routers/user'
import cron from 'node-cron'
import { json, urlencoded } from 'body-parser'

require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()
const mangasee123sc = new scraper()

app.set('json spaces', 4)

app.use(json())
app.use(urlencoded({
  extended: false
}))

app.use('/manga', mangaRouter)

UserRoutes.routes(app)

app.use("/", (request: express.Request, response: express.Response) => {
  response.sendFile(__dirname + '/Routers/index.html')
})

app.listen(PORT, () => {
  console.log("Server's on @" + PORT)

  cron.schedule('0 0 0 * * *', () => {
    mangasee123sc.all()
  })
})
