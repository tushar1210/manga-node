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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const axios = __importStar(require("axios"));
const cheerio = __importStar(require("cheerio"));
const qs = __importStar(require("querystring"));
const Fs = __importStar(require("fs"));
class Scraper {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'DNT': '1',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/javascript, */* q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        this.baseURL = "https://mangakakalot.com";
        this.dataURL = "https://manganelo.com";
    }
    hotUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            for (let i = 1; i < 5; i++) {
                const url = this.dataURL + `/genre-all/${i}`;
                yield axios.default({
                    method: 'GET',
                    headers: this.defaultHeaders,
                    url: url,
                    params: {
                        type: "topview"
                    }
                })
                    .then((data) => {
                    try {
                        res = res.concat(this.scrapeHotUpdates(data));
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                })
                    .catch((e) => {
                    return Promise.reject(e.message);
                });
            }
            return res;
        });
    }
    latestUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            var res = [];
            for (let i = 1; i < 2; i++) {
                const url = this.dataURL + `/genre-all/${i}`;
                yield axios.default({
                    method: 'GET',
                    headers: this.defaultHeaders,
                    url: url
                })
                    .then((data) => {
                    try {
                        res = res.concat(this.scrapeLatestUpdates(data));
                        console.log(url);
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                })
                    .catch((e) => {
                    return Promise.reject(e.message);
                });
            }
            return res;
        });
    }
    search(keyWord) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchResultArray = [];
            let params = {
                searchword: keyWord
            };
            yield axios.default.post('https://mangakakalot.com/home_json_search', qs.stringify(params), this.defaultHeaders)
                .then((data) => {
                try {
                    let searchResult = data.data;
                    searchResult.forEach((elem) => {
                        searchResultArray.push({
                            title: elem.name.replace(/<[^>]*>?/gm, ''),
                            sourceSpecificName: elem.nameunsigned,
                            imageURL: elem.image,
                            mangaURL: this.dataURL + '/manga/' + elem.story_link.split('/').splice(-1)[0],
                            source: this.baseURL,
                            additionalInfo: {
                                id: elem.id,
                                author: elem.author,
                                lastChapter: elem.lastchapter
                            }
                        });
                    });
                }
                catch (e) {
                    throw new Error(e);
                }
            })
                .catch((e) => {
            });
            return searchResultArray;
        });
    }
    getChaps(mangaName) {
        return __awaiter(this, void 0, void 0, function* () {
            let chapterResults = [];
            yield axios.default({
                url: this.dataURL + `/manga/${mangaName}`,
                method: 'GET',
                headers: this.defaultHeaders
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.row-content-chapter').children('li').each((_, elem) => {
                    let chapterItem = {
                        chapterNumber: $('a', elem).attr('href').split('_').splice(-1)[0],
                        chapterName: $('a', elem).attr('title'),
                        link: $('a', elem).attr('href'),
                        type: null,
                        date: $('.chapter-time', elem).attr('title')
                    };
                    chapterResults.push(chapterItem);
                });
            })
                .catch((e) => {
            });
            return chapterResults;
        });
    }
    mangaData(chapterURL) {
        return __awaiter(this, void 0, void 0, function* () {
            var chapterData = {};
            var chapterNumber;
            var mangaName;
            yield axios.default({
                url: chapterURL,
                headers: this.defaultHeaders,
                method: 'GET'
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.container-chapter-reader').each((_, elem) => {
                    $('img', elem).each((idx, element) => {
                        chapterData[idx] = $(element).attr('src');
                    });
                });
                chapterNumber = $('.panel-breadcrumb').children('a').last().html().replace(/^\D+/g, '');
                mangaName = $('.panel-breadcrumb').children('a').first().next().next().text();
            })
                .catch((e) => {
            });
            var mangaDataDict = {
                imageURL: chapterData,
                chapterNumber: chapterNumber,
                mangaTitle: mangaName
            };
            return mangaDataDict;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(Fs.readFileSync('./public/mangakaklot-all.json').toString());
        });
    }
    scrapeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var res = [];
            for (let i = 1; i <= 1156; i++) {
                const url = this.dataURL + `/genre-all/${i}`;
                yield axios.default({
                    method: 'GET',
                    headers: this.defaultHeaders,
                    url: url
                })
                    .then((data) => {
                    try {
                        res = res.concat(this.scrapeLatestUpdates(data));
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                })
                    .catch((e) => {
                    return Promise.reject(e.message);
                });
            }
            Fs.writeFile('./public/mangakaklot-all.json', JSON.stringify(res), (e) => {
                console.log("completed");
                if (e != null) {
                    throw new Error(e.message);
                }
            });
        });
    }
    scrapeHotUpdates(data) {
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
    scrapeLatestUpdates(data) {
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
}
exports.scraper = Scraper;
//# sourceMappingURL=mangakakalot.js.map