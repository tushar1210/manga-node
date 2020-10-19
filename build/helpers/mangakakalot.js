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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeLatestUpdates = exports.scrapeHotUpdates = void 0;
const cheerio = __importStar(require("cheerio"));
function scrapeHotUpdates(data) {
    let res = [];
    var $ = cheerio.load(data.data, { xmlMode: true });
    $('.panel-content-genres').children().each((_, elem) => {
        let hotUpdateItem = {
            title: $('a', elem).attr('title'),
            imageURL: $('img', elem).attr('src'),
            source: 'manganelo.com',
            sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
            currentChapter: $('div', elem).children('a').first().text(),
            currentChapterURL: $('div', elem).children('a').attr('href'),
            additionalInfo: {
                rating: $('em', elem).text(),
                views: $('.genres-item-view', elem).html(),
                date: $('.genres-item-time', elem).html(),
                author: $('.genres-item-author', elem).html(),
                description: $('.genres-item-description', elem).text().replace(/<[^>]*>?/gm, ''),
                mangaURL: $('a', elem).attr('href')
            }
        };
        res.push(hotUpdateItem);
    });
    return res;
}
exports.scrapeHotUpdates = scrapeHotUpdates;
function scrapeLatestUpdates(data) {
    let res = [];
    var $ = cheerio.load(data.data, { xmlMode: true });
    $('.panel-content-genres').children().each((_, elem) => {
        let hotUpdateItem = {
            title: $('a', elem).attr('title'),
            imageURL: $('img', elem).attr('src'),
            source: 'manganelo.com',
            sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
            currentChapter: $('div', elem).children('a').first().text(),
            currentChapterURL: $('div', elem).children('a').attr('href'),
            additionalInfo: {
                rating: $('em', elem).text(),
                views: $('.genres-item-view', elem).html(),
                date: $('.genres-item-time', elem).html(),
                author: $('.genres-item-author', elem).html(),
                description: $('.genres-item-description', elem).text().replace(/<[^>]*>?/gm, '').replace('\n', ''),
                mangaURL: $('a', elem).attr('href')
            }
        };
        res.push(hotUpdateItem);
    });
    return res;
}
exports.scrapeLatestUpdates = scrapeLatestUpdates;
//# sourceMappingURL=mangakakalot.js.map