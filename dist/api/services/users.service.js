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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const user_1 = require("../models/user");
class UsersService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all users");
            const users = (yield user_1.User.find(null, "-_id -__v").lean());
            // const usersname = users.map((user) => user.getFullName());
            return users;
        });
    }
    getById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch user with id ${user_id}`);
            const user = (yield user_1.User.findOne({ user_id: user_id }, "-_user_id -__v").lean());
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`create user with data ${data}`);
            const user = new user_1.User(data);
            const doc = (yield user.save());
            return doc;
        });
    }
    //this function uses the user_id and returns an updated userModel
    updateById(data, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`update users data ${data}`);
            const filter = { user_id: user_id };
            return (yield user_1.User.findOneAndUpdate(filter, data).exec());
        });
    }
    getBy(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_1.User.findOne({ [key]: value }, "-_id -__v").lean());
            return user;
        });
    }
    update_push_token(user_id, push_token) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`updating user ${user_id} token: ${push_token}`);
            const doc = yield user_1.User.findOneAndUpdate({ user_id: user_id }, { push_token: push_token }, 
            // If `new` isn't true, `findOneAndUpdate()` will return the
            // document as it was _before_ it was updated.
            { new: true });
            return doc;
        });
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
//# sourceMappingURL=users.service.js.map