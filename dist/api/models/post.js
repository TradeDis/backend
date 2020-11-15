"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const poster = new mongoose_1.default.Schema({
    user_id: Number,
    username: String,
    full_name: String,
    avatar: String,
});
const commenter = new mongoose_1.default.Schema({
    user_id: Number,
    username: String,
    full_name: String,
    avatar: String,
});
const comment = new mongoose_1.default.Schema({
    comment_id: String,
    created_by: commenter,
    comment: String,
});
const posts = new mongoose_1.default.Schema({
    post_id: { type: Number, unique: true },
    title: String,
    location: String,
    requesting: Boolean,
    content: String,
    created_by: poster,
    date: Date,
    status: String,
    tags: [String],
    comments: [comment],
}, {
    collection: "posts",
});
posts.plugin(AutoIncrement, { inc_field: "post_id" });
exports.Post = mongoose_1.default.model("Post", posts);
//# sourceMappingURL=post.js.map