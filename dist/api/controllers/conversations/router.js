"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const controller_2 = __importDefault(require("../messages/controller"));
exports.default = express_1.default
    .Router()
    .post("/", controller_1.default.create)
    // .post("/login", controller.login)
    .get("/", controller_1.default.getAll)
    .get("/:conversation_id/messages", controller_2.default.getAllByConversationId)
    .post("/:conversation_id/messages", controller_2.default.create);
// .get("/:user_id", controller.getById)
// .put("/:user_id", controller.updateById);
//# sourceMappingURL=router.js.map