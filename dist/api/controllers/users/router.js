"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const controller_2 = __importDefault(require("../conversations/controller"));
exports.default = express_1.default
    .Router()
    .post("/", controller_1.default.create)
    .post("/login", controller_1.default.login)
    .get("/", controller_1.default.getAll)
    .get("/:user_id", controller_1.default.getById)
    .post("/:user_id/token", controller_1.default.update_push_token)
    .put("/:user_id", controller_1.default.updateById)
    .get("/:member_id/conversations", controller_2.default.getByMemberId);
//# sourceMappingURL=router.js.map