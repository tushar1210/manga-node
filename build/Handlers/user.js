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
exports.register = exports.login = void 0;
const Models = __importStar(require("../Models/user"));
const User = Models.User;
function login(id, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ id: id, pass: pass }).exec();
    });
}
exports.login = login;
function register(id, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User.findOne({ id: id, pass: pass }, (err, user) => {
                if (err) {
                    reject(err);
                }
                if (user) {
                    reject(user);
                }
                else {
                    let u = new User({
                        id: id,
                        pass: pass
                    });
                    resolve(u.save());
                }
            });
        });
    });
}
exports.register = register;
//# sourceMappingURL=user.js.map