"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const user = new mongoose_1.default.Schema({
    user_id: Number,
    name: String,
    avatar: String,
});
const messages = new mongoose_1.default.Schema({
    conversation_id: { type: Number, required: true },
    message_id: { type: Number, unique: true },
    text: { type: String, required: true },
    user: { type: user, required: true },
    image: String,
    video: String,
    audio: String,
    system: Boolean,
    sent: Boolean,
    received: Boolean,
    pending: Boolean,
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "createdAt" },
    collection: "messages",
});
messages.plugin(AutoIncrement, { inc_field: "message_id" });
exports.Message = mongoose_1.default.model("Message", messages);
//# sourceMappingURL=message.js.map