"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
require('dotenv').config();
var PORT = process.env.PORT || 50;
var app = express();
app.set('json spaces', 4);
var connString = String(process.env.CONNECTION_STRING);
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log('Connected');
});
// app.listen(PORT,()=>{
//     console.log("Started at port no "+PORT);
// });
