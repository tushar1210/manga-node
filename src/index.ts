import express = require ('express');
import mongoose = require("mongoose");
import userRouter from './Routers/user';
import mangaRouter from './Routers/manga'
require('dotenv').config()

mongoose.Promise = global.Promise ;

const PORT = process.env.PORT || 50;
const app = express() ;
app.set('json spaces', 4);

const connString = String(process.env.CONNECTION_STRING);
app.use('/user',userRouter);
app.use('/manga',mangaRouter);
// mongoose.connect(connString,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
//     console.log('Connected');
// });

app.listen(PORT,()=>{
    console.log("Started at port no "+PORT);
});

export default mongoose;