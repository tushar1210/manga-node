"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var user_1 = __importDefault(require("./Routers/user"));
var manga_1 = __importDefault(require("./Routers/manga"));
var mangaHandler = __importStar(require("./Handlers/manga"));
var cron = __importStar(require("node-cron"));
require('dotenv').config();
mongoose.Promise = global.Promise;
var PORT = process.env.PORT || 50;
var app = express();
app.set('json spaces', 4);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
app.use("/", function (req, res) {
    res.sendFile(__dirname + '/Routers/index.html');
});
app.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36');
var connString = String(process.env.CONNECTION_STRING);
app.listen(PORT, function () {
    cron.schedule('*/5 * * * * *', function () {
        console.log(1);
        mangaHandler.updateMangaEdenListJSON();
    });
});
exports.default = mongoose;
