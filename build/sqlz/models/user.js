"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class User extends sequelize_1.Model {
}
exports.User = User;
class UserModel {
}
exports.UserModel = UserModel;
User
    .init({
    email: sequelize_1.STRING(200),
    password: sequelize_1.STRING(100),
    title: sequelize_1.STRING(200),
    favourites: sequelize_1.ARRAY(sequelize_1.STRING(200))
}, {
    sequelize: index_1.sequelize, modelName: 'User', freezeTableName: true, underscored: true
});
//# sourceMappingURL=user.js.map