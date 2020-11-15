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
exports.ConversationsService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const conversation_1 = require("../models/conversation");
class ConversationsService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all conversations");
            const conversations = (yield conversation_1.Conversation.find(null, "-_id -__v").lean());
            return conversations;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch conversation with conversation_id ${id}`);
            const conversation = (yield conversation_1.Conversation.findOne({ conversation_id: id }, "-_id -__v").lean());
            return conversation;
        });
    }
    getByMemberId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch conversation by member id ${user_id}`);
            const conversation = (yield conversation_1.Conversation.find({
                members: {
                    $elemMatch: {
                        user_id,
                    },
                },
            }, "-_id -__v").lean());
            return conversation;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`create conversation with data ${data}`);
            const conversation = new conversation_1.Conversation(data);
            const doc = (yield conversation.save());
            return doc;
        });
    }
}
exports.ConversationsService = ConversationsService;
exports.default = new ConversationsService();
//# sourceMappingURL=conversations.service.js.map