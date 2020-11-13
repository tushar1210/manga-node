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
const Fs = __importStar(require("fs"));
const cheerio = __importStar(require("cheerio"));
const ss = __importStar(require("string-similarity"));
const mangasee_1 = require("../helpers/mangasee");
class Scraper {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'DNT': '1',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/javascript, */* q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8'
        };
        this.baseURL = "https://mangasee123.com";
    }
    hotUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            const url = this.baseURL;
            yield axios.default
                .request({
                method: 'GET',
                headers: this.defaultHeaders,
                url: url
            })
                .then((data) => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                try {
                    str = (_a = $('script:not([src])')[6].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                }
                catch (e) {
                    throw new Error(e);
                }
                let parse = str === null || str === void 0 ? void 0 : str.match(/vm.HotUpdateJSON = (\[.*?\])/);
                let valid = JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1]);
                valid.forEach((element) => {
                    let updateResponse = {
                        title: element.SeriesName,
                        sourceSpecificName: element.IndexName,
                        imageURL: mangasee_1.thumbnail(element.IndexName),
                        source: this.baseURL,
                        currentChapter: mangasee_1.parseChapNumber(element.Chapter),
                        additionalInfo: {
                            id: element.SeriesID,
                            date: element.Date,
                            ended: element.IsEdd
                        }
                    };
                    res.push(updateResponse);
                });
            })
                .catch((e) => {
                return Promise.reject(e.message);
            });
            return res;
        });
    }
    latestUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            const url = this.baseURL;
            yield axios.default
                .request({
                method: 'GET',
                headers: this.defaultHeaders,
                url: url
            })
                .then((data) => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                try {
                    str = (_a = $('script:not([src])')[6].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                }
                catch (e) {
                    throw new Error(e);
                }
                let parse = str === null || str === void 0 ? void 0 : str.match(/vm.LatestJSON = (\[.*?\])/);
                let valid = JSON.parse(parse[0].split('vm.LatestJSON = ')[1]);
                valid.forEach((element) => {
                    let mangaData = {
                        title: element.SeriesName,
                        sourceSpecificName: element.IndexName,
                        source: this.baseURL,
                        imageURL: mangasee_1.thumbnail(element.IndexName),
                        currentChapter: mangasee_1.parseChapNumber(element.Chapter),
                        additionalInfo: {
                            id: element.SeriesID,
                            genres: element.Genres,
                            date: element.Date,
                            scanStatus: element.ScanStatus,
                            ended: element.IsEdd
                        }
                    };
                    res.push(mangaData);
                });
                return res;
            })
                .catch((e) => {
                return Promise.reject(res);
            });
            return res;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseURL + "/_search.php";
            yield axios.default
                .request({
                method: 'POST',
                headers: this.defaultHeaders,
                url: url
            })
                .then((data) => {
                let valid = data.data;
                let res = [];
                valid.forEach((element) => {
                    let searchObject = {
                        title: element.s,
                        sourceSpecificName: element.i,
                        imageURL: mangasee_1.thumbnail(element.i),
                        mangaURL: this.baseURL + '/manga/' + element.i,
                        source: this.baseURL,
                        additionalInfo: {
                            alternateNames: element.a
                        }
                    };
                    res.push(searchObject);
                });
                Fs.writeFileSync('./public/mangasee123-all.json', JSON.stringify(res));
            })
                .catch((e) => {
                return Promise.reject(e.message);
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = JSON.parse(Fs.readFileSync('./public/mangasee123-all.json').toString());
            return data;
        });
    }
    search(keyWord) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getAll();
            let res = [];
            data.forEach((element) => {
                if (ss.compareTwoStrings(keyWord.toLowerCase(), element.title.toLowerCase()) > 0.4 || ss.compareTwoStrings(keyWord.toLowerCase(), element.sourceSpecificName.toLowerCase()) > 0.5) {
                    res.push(element);
                }
            });
            res.reverse();
            return res;
        });
    }
    getChaps(mangaName) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            let mangaNameR = mangaName.replace("/\s/", "-");
            const url = this.baseURL + "/manga/" + mangaNameR;
            yield axios.default
                .request({
                method: 'GET',
                headers: this.defaultHeaders,
                url: url
            })
                .then((data) => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                try {
                    str = (_a = $('script:not([src])')[5].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                }
                catch (e) {
                    throw new Error(e);
                }
                let parse = str === null || str === void 0 ? void 0 : str.match(/vm.Chapters = (\[.*?\])/);
                let valid = JSON.parse(parse[0].split('vm.Chapters = ')[1]);
                valid.forEach((element) => {
                    let mangaData = {
                        chapterNumber: mangasee_1.parseChapNumber(element.Chapter),
                        link: "https://mangasee123.com/read-online/" + mangaNameR + "-chapter-" + mangasee_1.parseChapNumber(element.Chapter) + mangasee_1.chapToken(element.Chapter) + ".html",
                        type: element.Type,
                        date: element.Date,
                        chapterName: element.ChapterName
                    };
                    res.push(mangaData);
                });
                return res;
            })
                .catch((e) => {
                return Promise.reject(e.message);
            });
            return res;
        });
    }
    mangaData(chapterURL) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = chapterURL;
            var final;
            yield axios.default.request({
                method: 'GET',
                url: url,
                headers: this.defaultHeaders
            })
                .then((data) => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                if ($('script:not([src])').length != 6) {
                    throw new Error("Illegal chapterURL");
                }
                str = (_a = $('script:not([src])')[5].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                let path = str === null || str === void 0 ? void 0 : str.match(/vm.CurPathName = (\".*?\")/)[1].split(/"*"/)[1];
                let curChapter = JSON.parse(str === null || str === void 0 ? void 0 : str.match(/vm.CurChapter = (\{.*?\})/)[1]);
                let sourceSpecificName = str === null || str === void 0 ? void 0 : str.match(/vm.IndexName = (\".*?\")/)[1].split(/"*"/)[1];
                let chpNum = Number(curChapter.Page);
                let chpPath = curChapter.Chapter.substring(1, 5);
                if (curChapter.Chapter[5] != '0') {
                    chpPath += '.';
                    for (let i = 5; i < curChapter.Chapter.length; i++) {
                        chpPath += curChapter.Chapter[i];
                    }
                }
                let imgURL = '';
                if (curChapter.Directory == '') {
                    imgURL = `https://${path}/manga/${sourceSpecificName}/${chpPath}-`;
                }
                else {
                    imgURL = `https://${path}/manga/${sourceSpecificName}/${curChapter.Directory}/${chpPath}-`;
                }
                let imageDict = {};
                for (let index = 1; index <= chpNum; index++) {
                    let chpURL = imgURL;
                    if (index >= 1 && index <= 9) {
                        chpURL += '00' + index.toString();
                    }
                    else if (index >= 10 && index <= 99) {
                        chpURL += '0' + index.toString();
                    }
                    else {
                        chpURL += index.toString();
                    }
                    chpURL += '.png';
                    let i = index.toString();
                    imageDict[i] = chpURL;
                }
                let res = {
                    imageURL: imageDict,
                    chapterNumber: curChapter.Chapter,
                    mangaTitle: null
                };
                final = res;
            })
                .catch((e) => {
                let res = {
                    imageURL: {},
                    mangaTitle: null,
                    chapterNumber: null
                };
                final = res;
                return Promise.reject(res);
            });
            return final;
        });
    }
}
exports.scraper = Scraper;
//# sourceMappingURL=mangasee123.js.map