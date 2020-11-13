"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mangasee123_1 = require("./scrapper/mangasee123");
const mangakakalot_1 = require("./scrapper/mangakakalot");
const mangafox_1 = require("./scrapper/mangafox");
const manga_1 = __importDefault(require("./routers/manga"));
const node_cron_1 = __importDefault(require("node-cron"));
const path = require('path');
const body_parser_1 = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const mangasee123sc = new mangasee123_1.scraper();
const mangakakalotsc = new mangakakalot_1.scraper();
const mangafoxsc = new mangafox_1.mangafoxScraper();
app.set('json spaces', 4);
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: false
}));
app.use('/manga', manga_1.default);
app.use("/", (request, response) => {
    response.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(PORT, () => {
    console.log("Server's on @" + PORT);
    node_cron_1.default.schedule('0 0 0 * * *', () => {
        mangasee123sc.all();
        mangakakalotsc.scrapeAll();
        mangafoxsc.scrapeAll();
    });
});
//# sourceMappingURL=index.js.map