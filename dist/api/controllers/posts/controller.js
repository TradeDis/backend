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
const posts_service_1 = __importDefault(require("../../services/posts.service"));
const conversations_service_1 = __importDefault(require("../../services/conversations.service"));
const messages_service_1 = __importDefault(require("../../services/messages.service"));
class Controller {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield posts_service_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield posts_service_1.default.getById(parseInt(req.params.post_id)); //query param is a string, must convert to number with parseInt
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Post not found" }];
                return res.status(404).json({ errors });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield posts_service_1.default.getByUserId(parseInt(req.params.user_id)); //query param is a string, must convert to number with parseInt
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Post not found" }];
                return res.status(404).json({ errors });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getByProposerId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield posts_service_1.default.getByProposerId(parseInt(req.params.user_id)); //query param is a string, must convert to number with parseInt
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Post not found" }];
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
                const doc = yield posts_service_1.default.create(req.body);
                // send({
                //   sound: "default",
                //   body: "A post is created",
                //   data: { withSome: "data" },
                // });
                return res.status(201).location(`/api/v1/examples/${doc.id}`).end();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    updatePostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield posts_service_1.default.updatePostById(req.body, parseInt(req.params.post_id));
                console.log(doc);
                return res.status(201).json(doc);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    propose(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Propose");
            const { post_id } = req.params;
            let { conversation, systemMessage, firstMessage, proposer } = req.body;
            try {
                const new_conversation = yield conversations_service_1.default.create(conversation);
                systemMessage.conversation_id = new_conversation.conversation_id;
                yield messages_service_1.default.create(systemMessage);
                firstMessage.conversation_id = new_conversation.conversation_id;
                yield messages_service_1.default.create(firstMessage);
                const post = yield posts_service_1.default.getById(parseInt(post_id));
                post.proposers.push(proposer);
                yield post.save();
                return res.status(201).json(new_conversation);
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