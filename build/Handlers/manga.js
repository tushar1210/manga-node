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
var Fs = __importStar(require("fs"));
var Path = __importStar(require("path"));
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
};
function mangaEdenList() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers })];
        });
    });
}
exports.mangaEdenList = mangaEdenList;
function mangaEdenGetImage(dir, imgPath) {
    return __awaiter(this, void 0, void 0, function () {
        var url, path, writer, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'https://cdn.mangaeden.com/mangasimg/' + dir + "/" + imgPath;
                    path = Path.resolve('./build/temp/thumbnail', 'image.jpg');
                    writer = Fs.createWriteStream(path);
                    return [4, axios.default({
                            url: url,
                            method: 'GET',
                            responseType: 'stream',
                            headers: headers
                        })];
                case 1:
                    response = _a.sent();
                    response.data.pipe(writer);
                    return [2, new Promise(function (resolve, reject) {
                            writer.on('finish', resolve);
                            writer.on('error', reject);
                        })];
            }
        });
    });
}
exports.mangaEdenGetImage = mangaEdenGetImage;
function mangaEdenChapterList(mangaID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, axios.default.request({
                        method: 'GET',
                        headers: headers,
                        url: "https://www.mangaeden.com/api/manga/" + mangaID
                    })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.mangaEdenChapterList = mangaEdenChapterList;
function updateMangaEdenListJSON() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers })
                        .then(function (data) {
                        console.log('1');
                        var obj = JSON.stringify(data.data.manga);
                        Fs.writeFileSync('./build/temp/eden-list.json', obj);
                    })
                        .catch(function (e) {
                        console.log(e);
                        return;
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.updateMangaEdenListJSON = updateMangaEdenListJSON;
function getChapter(chapterId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, axios.default.request({
                        method: 'GET',
                        headers: headers,
                        url: "https://www.mangaeden.com/api/chapter/" + chapterId
                    })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.getChapter = getChapter;
