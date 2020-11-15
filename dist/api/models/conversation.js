"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const user = new mongoose_1.default.Schema({
    user_id: Number,
    name: String,
    avatar: String,
});
const conversations = new mongoose_1.default.Schema({
    conversation_id: { type: Number, unique: true },
    name: String,
    members: [user],
    // reference to the post
    post_id: Number,
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "conversations",
});
conversations.plugin(AutoIncrement, { inc_field: "conversation_id" });
exports.Conversation = mongoose_1.default.model("Conversation", conversations);
/*
{
  "members": [{
      "user_id": 3,
      "name": "alan wu"
  },{
 "user_id": 2,
      "name": "henry wu"
  }],
  "name": "conversation 3",
  "post_id": 3
}
*/
//# sourceMappingURL=conversation.js.map