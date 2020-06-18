"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var user_1 = __importDefault(require("./Routers/user"));
var manga_1 = __importDefault(require("./Routers/manga"));
require('dotenv').config();
mongoose.Promise = global.Promise;
var PORT = process.env.PORT || 50;
var app = express();
app.set('json spaces', 4);
var connString = String(process.env.CONNECTION_STRING);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
// mongoose.connect(connString,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
//     console.log('Connected');
// });
app.listen(PORT, function () {
    console.log("Started at port no " + PORT);
});
exports.default = mongoose;
