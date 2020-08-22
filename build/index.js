"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const user_1 = __importDefault(require("./Routers/user"));
const manga_1 = __importDefault(require("./Routers/manga"));
const mangaHandler = __importStar(require("./Handlers/manga"));
const cron = __importStar(require("node-cron"));
require('dotenv').config();
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const app = express();
app.set('json spaces', 4);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
app.use("/", (req, res) => {
    res.sendFile(__dirname + '/Routers/index.html');
});
app.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36');
const connString = String(process.env.CONNECTION_STRING);
app.listen(PORT, () => {
    console.log("Server's up on " + PORT);
    cron.schedule('0 0 * * * *', () => {
        mangaHandler.updateMangaEdenListJSON();
    });
});
exports.default = mongoose;
//# sourceMappingURL=index.js.map