import express = require ('express');
import mongoose = require("mongoose");
import userRouter from './Routers/user';
import mangaRouter from './Routers/manga';
import * as mangaHandler from './Handlers/manga';
import * as cron from 'node-cron';

require('dotenv').config()

mongoose.Promise = global.Promise ;

const PORT = process.env.PORT || 5000;
const app = express() ;
app.set('json spaces', 4);

app.use('/user',userRouter);
app.use('/manga',mangaRouter);
app.use("/",(req,res)=>{
    res.sendFile(__dirname+'/Routers/index.html');
});

app.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36')

const connString = String(process.env.CONNECTION_STRING);
// mongoose.connect(connString,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
// });

app.listen(PORT,()=>{
    console.log("Server's up on " + PORT)
    cron.schedule('0 0 * * * *',()=>{
        mangaHandler.updateMangaEdenListJSON()
    });
});

export default mongoose;