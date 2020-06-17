import express = require ('express');
import mongoose = require("mongoose");
import user from './Routers/user';
require('dotenv').config()

mongoose.Promise = global.Promise ;

const PORT = process.env.PORT || 50;
const app = express() ;
app.set('json spaces', 4);

const connString = String(process.env.CONNECTION_STRING);
app.use('/user',user);

mongoose.connect(connString,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected');
});

app.listen(PORT,()=>{
    console.log("Started at port no "+PORT);
});

export default mongoose;