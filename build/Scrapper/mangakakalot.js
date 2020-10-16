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
const helpers = __importStar(require("../helpers/mangakakalot"));
class scraper {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'DNT': '1',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/javascript, */* q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8'
        };
        this.baseURL = "https://mangakakalot.com";
    }
    hotUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            const url = this.baseURL + '/manga_list?type=topview&category=all&state=all&page=';
            for (let i = 1; i < 4; i++) {
                yield axios.default({
                    method: 'GET',
                    headers: this.defaultHeaders,
                    url: url + String(i)
                })
                    .then((data) => {
                    try {
                        res = helpers.scrape(data);
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
            const url = this.baseURL + '/manga_list?type=latest&category=all&state=all&page=';
            for (let i = 1; i < 4; i++) {
                yield axios.default({
                    method: 'GET',
                    headers: this.defaultHeaders,
                    url: url + String(i)
                })
                    .then((data) => {
                    try {
                        res = helpers.scrape(data);
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
}
exports.scraper = scraper;
//# sourceMappingURL=mangakakalot.js.map