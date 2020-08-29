"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const endpoints_1 = require("../sqlz/endpoints");
function routes(app) {
    app.post('/api/signup', endpoints_1.UsersCtrlEndPoint.UsersCtrlPost.signup);
    app.post('/api/login', endpoints_1.UsersCtrlEndPoint.UsersCtrlPost.login);
}
exports.routes = routes;
//# sourceMappingURL=user.js.map