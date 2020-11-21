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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangafoxScraper = void 0;
const axios = __importStar(require("axios"));
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const mangafox_1 = require("../helpers/mangafox");
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
        this.baseURL = "https://fanfox.net";
    }
    hotUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            yield axios.default({
                url: this.baseURL + '/hot/',
                headers: this.defaultHeaders,
                method: 'GET'
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.manga-list-1-list').children('li').each((_, elem) => {
                    var chapterDetailsArray = $('p', elem).next().text().split('      ');
                    let hotUpdate = {
                        title: $('a', elem).attr('title'),
                        imageURL: $('a', elem).children('img').attr('src'),
                        source: this.baseURL,
                        sourceSpecificName: $('a', elem).attr('href').replace('/manga/', '').replace('/', ''),
                        currentChapter: chapterDetailsArray[0],
                        currentChapterURL: this.baseURL + $('p', elem).next().children('a').attr('href'),
                        additionalInfo: {
                            rating: chapterDetailsArray[1]
                        }
                    };
                    res.push(hotUpdate);
                });
            })
                .catch((e) => {
            });
            return res;
        });
    }
    latestUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            yield axios.default({
                url: this.baseURL + '/releases/',
                headers: this.defaultHeaders,
                method: 'GET'
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.manga-list-4-list').children('li').each((_, elem) => {
                    let genreArray = $(elem).children('p').last().text().split(' ').filter(String);
                    let latestUpdate = {
                        title: $(elem).children('a').attr('title'),
                        imageURL: $(elem).children('a').children('img').attr('src'),
                        source: this.baseURL,
                        sourceSpecificName: $(elem).children('p').children('a').attr('href').split('/').splice(-2)[0],
                        currentChapter: $(elem).children('ul').first().children().first().text(),
                        currentChapterURL: this.baseURL + $(elem).children('ul').first().children().first().children('a').attr('href'),
                        additionalInfo: {
                            genres: genreArray
                        }
                    };
                    res.push(latestUpdate);
                });
            });
            return res;
        });
    }
    search(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            yield axios.default({
                url: this.baseURL + '/search',
                headers: this.defaultHeaders,
                method: 'GET',
                params: {
                    title: keyword.replace(' ', '+')
                }
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.manga-list-4-list').children('li').each((_, element) => {
                    let authors = [];
                    $(element).children('p').next().first().next().children('a').each((__, elem) => {
                        authors.push($(elem).text());
                    });
                    let searchElement = {
                        title: $(element).children('a').attr('title'),
                        sourceSpecificName: $(element).children('a').attr('href').split('/').filter(String).splice(-1)[0],
                        imageURL: $(element).children('a').children('img').attr('src'),
                        mangaURL: this.baseURL + $(element).children('a').attr('href'),
                        source: this.baseURL,
                        additionalInfo: {
                            status: $(element).children('p').next().first().text(),
                            latestChapter: $(element).children('p').next().first().next().next().text(),
                            author: authors,
                            synopsis: $(element).children('p').last().text()
                        }
                    };
                    res.push(searchElement);
                });
            })
                .catch((e) => {
            });
            return res;
        });
    }
    getChaps(mangaName) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            let url = this.baseURL + `/manga/${mangaName}`;
            yield axios.default({
                url: url,
                headers: this.defaultHeaders,
                method: 'GET'
            })
                .then((data) => {
                var $ = cheerio.load(data.data);
                $('.detail-main-list').children('li').each((_, elem) => {
                    let chp = $(elem).children('a').children('div').children('p').first().text().split('-');
                    let chapter = {
                        link: this.baseURL + $(elem).children('a').attr('href'),
                        chapterNumber: chp[0],
                        chapterName: (chp.length == 2) ? chp[1] : '',
                        type: '',
                        date: $(elem).children('a').children('div').children('p').first().next().text()
                    };
                    res.push(chapter);
                });
            })
                .catch((e) => {
            });
            return res;
        });
    }
    mangaData(chapterURL) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                let browser = yield puppeteer_1.default.launch({
                    'args': [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ]
                });
                const [page] = yield browser.pages();
                page.setUserAgent('Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36');
                page.setDefaultTimeout(300000);
                yield page.goto(chapterURL, { waitUntil: 'networkidle0' });
                var chapterLength = 0;
                var appendingChar = '';
                var spanSections = yield page.$$('.pager-list.cp-pager-list > .pager-list-left > span > a');
                var isSinglePage = spanSections.length > 0 ? false : true;
                var isImageHyphenSpaced = false;
                var imageFiles = {};
                if (isSinglePage) {
                    let imageTags = yield page.$$('.reader-main-img');
                    chapterLength = imageTags.length;
                    var count = 0;
                    for (let imageTag of imageTags) {
                        yield page.evaluate(el => el.getAttribute('data-src'), imageTag).then((imageLink) => {
                            imageFiles[count] = imageLink.replace('//', '');
                            count += 1;
                        });
                    }
                }
                else {
                    chapterLength = Number(yield page.evaluate(() => document.querySelector('.pager-list-left span').textContent.replace(/\./g, '').split(' ').filter(Number).splice(-1)[0]));
                    var imageLink = yield page.evaluate(() => document.querySelector('.reader-main-img').getAttribute('src').split('?')[0]);
                    let imageLinkComponents = imageLink.split('/');
                    var lastComponent = imageLinkComponents.slice(-1)[0];
                    const imageFormat = lastComponent.split('.').splice(-1)[0];
                    if (/_/gm.test(imageLinkComponents.slice(-1)[0])) {
                        isImageHyphenSpaced = true;
                        for (let idx = 0; idx < chapterLength; idx++) {
                            var splittedLastComponent = lastComponent.split('_');
                            let imageNumber = String(Number(splittedLastComponent.splice(-1)[0].replace('.' + imageFormat, '')) + idx);
                            splittedLastComponent.push(imageNumber + `.${imageFormat}`);
                            imageLinkComponents.pop();
                            imageLinkComponents.push(splittedLastComponent.join('_'));
                            imageFiles[idx] = imageLinkComponents.join('/').replace('//', '');
                        }
                    }
                    else {
                        isImageHyphenSpaced = false;
                        appendingChar = lastComponent.replace('.' + imageFormat, '').replace(/[0-9]/g, '');
                        imageLinkComponents.pop();
                        let chpURL = imageLinkComponents.join('/');
                        imageFiles = mangafox_1.parseChapNumber(chapterLength, chpURL, appendingChar, imageFormat);
                    }
                }
                res = {
                    imageURL: imageFiles,
                    chapterNumber: yield page.$eval('.reader-header-title-2', e => e.textContent),
                    mangaTitle: yield page.$eval('.reader-header-title-1', e => e.textContent)
                };
                yield browser.close();
            }
            catch (error) {
                throw new Error(String(error));
            }
            return res;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(Fs.readFileSync('./public/mangafox-all.json').toString());
        });
    }
    scrapeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var res = [];
            for (let idx = 1; idx <= 143; idx++) {
                let url = this.baseURL + '/directory/' + idx + '.html';
                yield axios.default({
                    url: url,
                    headers: this.defaultHeaders,
                    method: 'GET'
                })
                    .then((data) => {
                    var $ = cheerio.load(data.data);
                    $('.manga-list-1-list').children('li').each((_, element) => {
                        let manga = {
                            title: $('a', element).attr('title'),
                            imageURL: $('.manga-list-1-cover', element).attr('src'),
                            source: this.baseURL,
                            sourceSpecificName: $('a', element).attr('href').split('/').splice(-2)[0],
                            currentChapter: $('.manga-list-1-item-subtitle', element).children('a').first().text(),
                            currentChapterURL: this.baseURL + $('.manga-list-1-item-subtitle', element).children('a').first().attr('href'),
                            additionalInfo: {
                                rating: $('.item-score', element).text()
                            }
                        };
                        res.push(manga);
                    });
                })
                    .catch((e) => {
                    throw new Error(e.message);
                });
            }
            Fs.writeFile('./public/mangafox-all.json', JSON.stringify(res), (e) => {
                console.log("completed");
                if (e != null) {
                    throw new Error(e.message);
                }
            });
        });
    }
}
exports.mangafoxScraper = Scraper;
//# sourceMappingURL=mangafox.js.map