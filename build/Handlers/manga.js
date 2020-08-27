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
exports.getChapter = exports.updateMangaEdenListJSON = exports.mangaEdenChapterList = exports.mangaEdenGetImage = exports.mangaEdenList = void 0;
const axios = __importStar(require("axios"));
const Fs = __importStar(require("fs"));
const Path = __importStar(require("path"));
const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9',
};
function mangaEdenList() {
    return __awaiter(this, void 0, void 0, function* () {
        return axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers });
    });
}
exports.mangaEdenList = mangaEdenList;
function mangaEdenGetImage(dir, imgPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://cdn.mangaeden.com/mangasimg/' + dir + "/" + imgPath;
        const path = Path.resolve('./build/temp/thumbnail', 'image.jpg');
        const writer = Fs.createWriteStream(path);
        const response = yield axios.default({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: headers
        });
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    });
}
exports.mangaEdenGetImage = mangaEdenGetImage;
function mangaEdenChapterList(mangaID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.default.request({
            method: 'GET',
            headers: headers,
            url: "https://www.mangaeden.com/api/manga/" + mangaID
        });
    });
}
exports.mangaEdenChapterList = mangaEdenChapterList;
function updateMangaEdenListJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers })
            .then(data => {
            let obj = JSON.stringify(data.data.manga);
            Fs.writeFileSync('./build/temp/eden-list.json', obj);
            let now = new Date();
            Fs.appendFileSync('.log', '[Manga Eden] Succeessful MangaList Update at :    ' + now + '\n');
        })
            .catch(e => {
            return;
        });
    });
}
exports.updateMangaEdenListJSON = updateMangaEdenListJSON;
function getChapter(chapterId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.default.request({
            method: 'GET',
            headers: headers,
            url: "https://www.mangaeden.com/api/chapter/" + chapterId
        });
    });
}
exports.getChapter = getChapter;
//# sourceMappingURL=manga.js.map