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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = __importStar(require("axios"));
var cheerio = __importStar(require("cheerio"));
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'DNT': '1',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
function scrapeKissMangaAll(pageCtr) {
    return __awaiter(this, void 0, void 0, function () {
        var url, list, json, json1, ctr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'https://kissmanga.in/manga-list/page/' + '9' + '/?m_orderby=alphabet';
                    list = [];
                    ctr = 5;
                    return [4, axios.default.request({
                            method: 'GET',
                            headers: headers,
                            url: url
                        }).then(function (data) {
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
                            .catch(function (e) {
                        })];
                case 1:
                    _a.sent();
                    return [2, list];
            }
        });
    });
}
exports.scrapeKissMangaAll = scrapeKissMangaAll;
function search(key) {
    return __awaiter(this, void 0, void 0, function () {
        var base, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    base = 'https://kissmanga.in/wp-admin/admin-ajax.php';
                    params = new URLSearchParams();
                    params.append('action', 'wp-manga-search-manga');
                    params.append('title', key);
                    return [4, axios.default.request({
                            method: 'POST',
                            url: base,
                            headers: headers,
                            data: params
                        }).then(function (data) {
                            var list = [];
                            var result = data.data.data;
                            result.forEach(function (element) {
                                var succsessResult = {
                                    title: element.title,
                                    url: element.url,
                                };
                                list.push(succsessResult);
                            });
                            return list;
                        })
                            .catch(function (err) {
                            var list = [];
                            var failureResult = {
                                success: false,
                                error: err.message
                            };
                            list.push(failureResult);
                            return list;
                        })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.search = search;
