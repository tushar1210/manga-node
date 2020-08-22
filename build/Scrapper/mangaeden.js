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
exports.search = void 0;
const axios = __importStar(require("axios"));
const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
};
function search(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = 'https://www.mangaeden.com/ajax/search-manga';
        const params = new URLSearchParams();
        params.append('term', key);
        return yield axios.default.request({
            method: 'GET',
            headers: headers,
            url: base,
            params: params
        }).then((data) => {
            var list = [];
            var result = data.data;
            result.forEach(element => {
                if (element.url.charAt(1) == 'i' && element.url.charAt(2) == 't') {
                    return;
                }
                let succsessResult = {
                    title: element.value,
                    url: 'https://www.mangaeden.com/en' + element.url,
                };
                list.push(succsessResult);
            });
            return list;
        })
            .catch((err) => {
            var list = [];
            let failureResult = {
                success: false,
                error: err.message
            };
            return list;
        });
    });
}
exports.search = search;
//# sourceMappingURL=mangaeden.js.map