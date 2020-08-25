"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = __importStar(require("axios"));
const cheerio = __importStar(require("cheerio"));
class scraper {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'DNT': '1',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        this.baseURL = "https://mangasee123.com";
    }
    hotUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseURL + '/hot.php';
            axios.default.request({
                method: 'GET',
                headers: this.defaultHeaders,
                url: url
            }).then((data) => {
                var _a;
                var str, $ = cheerio.load(data.data, { xmlMode: true });
                str = (_a = $('script:not([src])')[4].children[0].data) === null || _a === void 0 ? void 0 : _a.toString();
                var parse = str === null || str === void 0 ? void 0 : str.match(/vm.HotUpdateJSON = (\[.*?\])/);
                var valid = JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1]);
                console.log(valid);
            }).catch((e) => {
                console.log(e);
            });
        });
    }
}
exports.scraper = scraper;
//# sourceMappingURL=mangasee123.js.map