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
exports.search = exports.scrapeKissMangaAll = void 0;
const axios = __importStar(require("axios"));
const cheerio = __importStar(require("cheerio"));
const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'DNT': '1',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
function scrapeKissMangaAll(pageCtr) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://kissmanga.in/manga-list/page/' + '9' + '/?m_orderby=alphabet';
        var list = [];
        var json;
        var json1;
        var ctr = 5;
        yield axios.default.request({
            method: 'GET',
            headers: headers,
            url: url
        }).then((data) => {
            var $ = cheerio.load(data.data);
            var title, link, image, lastChapter, lastChapterLink, lastChapterDate, id;
            var h = $('.page-listing-item');
            while (ctr-- > 0) {
                if (h.html() == null)
                    break;
                try {
                    id = String(h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').attr('data-post-id'));
                    link = h.children('.row').children('.col-12').children('.page-item-detail').
                        children('.item-thumb').children().first().attr('href');
                    title = h.children('.row').children('.col-12').children('.page-item-detail').
                        children('.item-thumb').children().first().attr('title');
                    image = h.children('.row').children('.col-12').children('.page-item-detail').
                        children('.item-thumb').children().children().first().attr('src');
                    lastChapter = h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().children().first().text();
                    lastChapter = lastChapter.split('\t')[7].trim();
                    lastChapterLink = h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().children().children().attr('href');
                    lastChapterDate = h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text();
                    lastChapterDate = lastChapterDate.split('\t')[9];
                    var json = {
                        id: id,
                        title: String(title),
                        link: String(link),
                        thumbnail: String(image),
                        lastChapter: String(lastChapter),
                        lastChapterDate: String(lastChapterDate),
                        lastChapterLink: String(lastChapterLink)
                    };
                    list.push(json);
                    id = String(h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').attr('data-post-id'));
                    link = h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').children().first().attr('href');
                    title = h.children('.row').children('.col-12').next().children('.page-item-detail').
                        children('.item-thumb').children().first().attr('title');
                    image = h.children('.row').children('.col-12').next().children('.page-item-detail').
                        children('.item-thumb').children().children().first().attr('src');
                    lastChapter = h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().first().text();
                    lastChapter = lastChapter.split('\t')[7].trim();
                    lastChapterLink = h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().children().children().attr('href');
                    lastChapterDate = h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text();
                    lastChapterDate = lastChapterDate.split('\t')[9];
                    var json1 = {
                        id: id,
                        title: String(title),
                        link: String(link),
                        thumbnail: String(image),
                        lastChapter: String(lastChapter),
                        lastChapterDate: String(lastChapterDate),
                        lastChapterLink: String(lastChapterLink)
                    };
                    list.push(json1);
                    h = h.next();
                }
                catch (e) {
                    return list;
                }
            }
        })
            .catch((e) => {
        });
        return list;
    });
}
exports.scrapeKissMangaAll = scrapeKissMangaAll;
function search(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = 'https://kissmanga.in/wp-admin/admin-ajax.php';
        const params = new URLSearchParams();
        params.append('action', 'wp-manga-search-manga');
        params.append('title', key);
        return yield axios.default.request({
            method: 'POST',
            url: base,
            headers: headers,
            data: params
        }).then((data) => {
            var list = [];
            var result = data.data.data;
            result.forEach(element => {
                let succsessResult = {
                    title: element.title,
                    url: element.url,
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
            list.push(failureResult);
            return list;
        });
    });
}
exports.search = search;
//# sourceMappingURL=kissmanga.js.map