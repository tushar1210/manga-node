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
class scraper {
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
                .then(data => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                str = (_a = $('script:not([src])')[6].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                let parse = str === null || str === void 0 ? void 0 : str.match(/vm.HotUpdateJSON = (\[.*?\])/);
                let valid = JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1]);
                const imageBaseURL = "https://cover.mangabeast01.com/cover/";
                valid.forEach(element => {
                    let mangaData = {
                        id: element.SeriesID,
                        sourceSpecificName: element.IndexName,
                        source: 'https://mangasee123.com/',
                        mangaName: element.SeriesName,
                        imageURL: imageBaseURL + element.IndexName + '.jpg',
                        date: element.Date,
                        currentChapter: element.Chapter.substring(2, 5),
                        ended: element.IsEdd
                    };
                    res.push(mangaData);
                });
                return res;
            })
                .catch(e => {
                return res;
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
                .then(data => {
                var _a;
                let str, $ = cheerio.load(data.data, { xmlMode: true });
                str = (_a = $('script:not([src])')[6].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                let parse = str === null || str === void 0 ? void 0 : str.match(/vm.LatestJSON = (\[.*?\])/);
                let valid = JSON.parse(parse[0].split('vm.LatestJSON = ')[1]);
                valid.forEach(element => {
                    let mangaData = {
                        id: element.SeriesID,
                        sourceSpecificName: element.IndexName,
                        source: 'https://mangasee123.com/',
                        mangaName: element.SeriesName,
                        genres: element.Genres,
                        date: element.Date,
                        newChapter: element.Chapter.substring(2, 5),
                        scanStatus: element.ScanStatus,
                        ended: element.IsEdd
                    };
                    res.push(mangaData);
                });
                return res;
            })
                .catch(e => {
                return res;
            });
            return res;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseURL + "/_search.php";
            let res = [];
            yield axios.default
                .request({
                method: 'POST',
                headers: this.defaultHeaders,
                url: url
            })
                .then(data => {
                var valid = data.data;
                var res = [];
                const imageBaseURL = "https://cover.mangabeast01.com/cover/";
                valid.forEach(element => {
                    let obj = { imageURL: imageBaseURL + element.i + '.jpg',
                        mangaURL: this.baseURL + '/manga/' + element.i,
                        source: 'https://mangasee123.com',
                        mangaName: element.s,
                        sourceSpecificName: element.i,
                        alternateNames: element.a
                    };
                    res.push(obj);
                });
                Fs.writeFileSync('./temp/mangasee123-all.json', JSON.stringify(res));
            })
                .catch(e => {
                return;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = JSON.parse(Fs.readFileSync('./temp/mangasee123-all.json').toString());
            return data;
        });
    }
}
exports.scraper = scraper;
//# sourceMappingURL=mangasee123.js.map