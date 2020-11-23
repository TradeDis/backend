"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
exports.default = express_1.default
    .Router()
    .post("/", controller_1.default.create)
    .get("/", controller_1.default.getAll)
    .get("/:post_id", controller_1.default.getById)
    .get("/user/:user_id", controller_1.default.getByUserId)
    .get("/proposer/:user_id", controller_1.default.getByProposerId)
    .put("/:post_id", controller_1.default.updatePostById)
    .post("/:post_id/propose", controller_1.default.propose);
//# sourceMappingURL=router.js.map