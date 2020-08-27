import express from "express"
import mongoose from "mongoose"
import userRouter from './Routers/user'
import mangaRouter from './Routers/manga'
import { scraper } from './Scrapper/mangasee123'
import cron from 'node-cron';

require('dotenv').config()

mongoose.Promise = global.Promise

const PORT = process.env.PORT || 5000
const app = express()
const mangasee123sc = new scraper()

app.set('json spaces', 4)

app.use('/user', userRouter)
app.use('/manga', mangaRouter)

app.use("/", (request: express.Request, response: express.Response) => {
    response.sendFile(__dirname + '/Routers/index.html')
})

const connString = String(process.env.CONNECTION_STRING)

mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
})

app.listen(PORT, () => {
    console.log("Server's on @" + PORT)

    cron.schedule('0 0 0 * * *', () => {
        mangasee123sc.all()
    })
})