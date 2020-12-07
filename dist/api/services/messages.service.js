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
exports.MessagesService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
const push_notification_1 = require("../../common/push_notification");
const users_service_1 = __importDefault(require("../services/users.service"));
class MessagesService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all messages");
            const messages = (yield message_1.Message.find(null).lean());
            return messages;
        });
    }
    getAllByConversationId(conversation_id, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all messages");
            const messages = (yield message_1.Message.find({ conversation_id })
                .lean()
                .limit(limit)
                .sort({ createdAt: -1 }));
            return messages;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch message with message_id ${id}`);
            const message = (yield message_1.Message.findOne({ message_id: id }, "-_id -__v").lean());
            return message;
        });
    }
    create(newMessage, fetchAll = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // l.info(`create message with data ${JSON.stringify(data)}`);
            const message = new message_1.Message(newMessage);
            const doc = (yield message.save());
            const convo = (yield conversation_1.Conversation.findOne({
                conversation_id: message.conversation_id,
            }));
            convo.latestMessage = {
                text: message.text,
                user: message.user,
            };
            yield convo.save();
            let messages = [];
            if (fetchAll) {
                messages = yield this.getAllByConversationId(doc.conversation_id);
                return messages;
            }
            let recipients = convo.members.filter((member) => {
                return (
                // skip sending notification to the sender and users who are in the chat
                member.user_id != newMessage.user.user_id);
            });
            console.log(recipients);
            recipients = yield Promise.all(recipients.map((member) => __awaiter(this, void 0, void 0, function* () {
                const user = yield users_service_1.default.getById(member.user_id);
                return user.push_token;
            })));
            console.log(recipients);
            push_notification_1.send(recipients, {
                sound: "default",
                title: `🎉 New Proposal for ${convo.name}`,
                body: `${newMessage.user.name}: ${newMessage.text}`,
                data: { convo },
            });
            return messages;
        });
    }
}
exports.MessagesService = MessagesService;
exports.default = new MessagesService();
//# sourceMappingURL=messages.service.js.map