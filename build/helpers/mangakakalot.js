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
exports.scrape = void 0;
const cheerio = __importStar(require("cheerio"));
function scrape(data) {
    let res = [];
    var $ = cheerio.load(data.data, { xmlMode: true });
    $('.truyen-list').children('.list-truyen-item-wrap').each((index, elem) => {
        let hotUpdate = {
            title: $('a', elem)[0].attribs.title,
            sourceSpecificName: $('a', elem).attr('href').split('/').slice(-1)[0],
            imageURL: $('img', elem).attr('src'),
            source: 'https://mangakakalot.com',
            currentChapter: $('a', elem)[2].attribs.title,
            currentChapterURL: $('a', elem)[2].attribs.href,
            additionalInfo: {
                views: $('a', elem).next().next().next().text().split('\n')[1],
                summary: $('p', elem).text().split('\n')[1],
                mangaURL: $('a', elem)[0].attribs.href
            }
        };
        res.push(hotUpdate);
    });
    return res;
}
exports.scrape = scrape;
//# sourceMappingURL=mangakakalot.js.map