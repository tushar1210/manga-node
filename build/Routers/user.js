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
const express_1 = require("express");
const handler = __importStar(require("../Handlers/user"));
const router = express_1.Router();
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var user = request.query.userId;
    var pass = request.query.pass;
    if ((user === null || pass === null) || (user === undefined || pass === undefined) || (user === '' || pass === '')) {
        response.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'invalid Parameters'
        });
        return;
    }
    else {
        user = String(request.query.userId);
        pass = String(request.query.pass);
        yield handler.login(user, pass).then((data) => {
            if (data !== null) {
                response.json({
                    success: true,
                    user: data
                });
            }
            else {
                response.status(210).json({
                    success: false,
                    message: "Invalid User"
                });
            }
        }).catch((e) => {
            response.status(501).json({
                success: false,
                message: "Server Error",
                error: e
            });
        });
        var a = 0;
    }
}));
router.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var user = request.query.userId;
    var pass = request.query.pass;
    if ((user === null || pass === null) || (user === undefined || pass === undefined) || (user === '' || pass === '')) {
        response.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'invalid Parameters'
        });
        return;
    }
    user = String(request.query.userId);
    pass = String(request.query.pass);
    yield handler.register(user, pass).then((data) => {
        response.json({
            success: true,
            user: data
        });
    })
        .catch((e) => {
        response.status(210).json({
            success: false,
            message: "User Exists"
        });
    });
}));
exports.default = router;
//# sourceMappingURL=user.js.map