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
exports.PostsService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const post_1 = require("../models/post");
class PostsService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all posts");
            const posts = (yield post_1.Post.find(null).sort({
                updatedAt: "desc",
            }));
            return posts;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch post with post_id ${id}`);
            const post = (yield post_1.Post.findOne({ post_id: id }));
            return post;
        });
    }
    getByProposerId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch post with user_id ${user_id}`);
            const posts = (yield post_1.Post.find({
                proposers: {
                    $elemMatch: {
                        user_id,
                    },
                },
            }, "-_id -__v").lean());
            return posts;
        });
    }
    getByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch post with user_id ${user_id}`);
            const posts = (yield post_1.Post.find({ "created_by.user_id": user_id }, "-_id -__v").lean());
            return posts;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`create post with data ${data}`);
            const post = new post_1.Post(data);
            const doc = (yield post.save());
            return doc;
        });
    }
    //this function uses the post_id and returns an updated postModel
    updatePostById(data, post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`update the post data ${data}`);
            const filter = { post_id: post_id };
            const post = yield post_1.Post.findOneAndUpdate(filter, data).exec();
            console.log(post);
            return post;
        });
    }
}
exports.PostsService = PostsService;
exports.default = new PostsService();
//# sourceMappingURL=posts.service.js.map