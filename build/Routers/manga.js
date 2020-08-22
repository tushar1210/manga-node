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
const express_1 = require("express");
const handler = __importStar(require("../Handlers/manga"));
const Fs = __importStar(require("fs"));
const mangaEdenScrapper = __importStar(require("../Scrapper/mangaeden"));
const kissMangaScrapper = __importStar(require("../Scrapper/kissmanga"));
const router = express_1.Router();
const sources = {
    0: "mangaEden",
    1: "kissmanga.in"
};
router.get('/list/:sourceId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var sourceId = request.params.sourceId;
    if (sourceId === null) {
        response.status(400).json({
            success: false,
            error: "Invalid/Insufficient Parameters"
        });
    }
    if (sourceId === '0') {
        const raw = Fs.readFileSync('./build/temp/eden-list.json');
        var data = JSON.parse(raw.toString());
        response.json({
            success: true,
            data: data
        });
    }
}));
router.get('/list/:sourceId/search/:query', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var sourceId = request.params.sourceId;
    var query = request.params.query;
    if (sourceId === null || query === null) {
        response.status(400).json({
            success: false,
            error: "Invalid/Insufficient Parameters"
        });
    }
    if (sourceId === '0') {
        yield mangaEdenScrapper.search(query).then((data) => {
            response.json({
                success: true,
                data: data
            });
        })
            .catch((err) => {
            response.status(404).json({
                success: false,
                data: []
            });
        });
    }
    if (sourceId === '1') {
        yield kissMangaScrapper.search(query)
            .then((data) => {
            response.json({
                success: true,
                data: data
            });
        })
            .catch((err) => {
            response.status(404).json({
                success: false,
                data: []
            });
        });
    }
}));
router.get('/image/:sourceId/:dir/:imageId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceId = request.params.sourceId;
    const dir = request.params.dir;
    const imageId = request.params.imageId;
    if (sourceId === '0') {
        yield handler.mangaEdenGetImage(dir, imageId)
            .then(() => {
            response.download('./build/temp/thumbnail/image.jpg', 'image.jpg', () => {
                Fs.unlinkSync('./build/temp/thumbnail/image.jpg');
            });
        })
            .catch(() => {
            response.status(500).json({
                success: false,
                message: "Unable to fetch Image",
            });
        });
    }
}));
router.get('/chapter/list/:sourceId/:mangaId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const mangaId = request.params.mangaId;
    const sourceId = request.params.sourceId;
    if (sourceId === '0') {
        yield handler.mangaEdenChapterList(mangaId)
            .then((data) => {
            response.json({
                success: true,
                data: data.data.chapters
            });
        })
            .catch((e) => {
            response.status(404).json({
                success: false,
                error: 'NOT Found',
                message: 'check mangaId'
            });
        });
    }
}));
router.get('/chapter/image/:sourceId/:chapterId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const chapterId = request.params.chapterId;
    const sourceId = request.params.sourceId;
    if (sourceId === '0') {
        yield handler.getChapter(chapterId)
            .then((data) => {
            response.json({
                success: true,
                data: data.data.images
            });
        })
            .catch((e) => {
            response.status(404).json({
                success: false,
                error: 'NOT Found',
                message: 'check chapterId'
            });
        });
    }
}));
router.get('/sources', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json(sources);
}));
exports.default = router;
//# sourceMappingURL=manga.js.map