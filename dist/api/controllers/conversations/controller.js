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
exports.Controller = void 0;
const conversations_service_1 = __importDefault(require("../../services/conversations.service"));
class Controller {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield conversations_service_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getByMemberId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield conversations_service_1.default.getByMemberId(parseInt(req.params.member_id));
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Conversations not found" }];
                return res.status(404).json({ errors });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield conversations_service_1.default.getById(parseInt(req.params.conversation_id));
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "User not found" }];
                return res.status(404).json({ errors });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validation would be handled in the User model
                const doc = yield conversations_service_1.default.create(req.body);
                return res
                    .status(201)
                    .location(`/api/v1/conversations/${doc.conversation_id}`)
                    .json(doc);
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map