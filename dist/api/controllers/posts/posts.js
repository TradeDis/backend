"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../../models/Post"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    Post_1.default.find({}, (err, posts) => {
        if (!err) {
            res.json(posts);
        }
        else {
            res.status(500).json(err);
        }
    });
});
router.post("/", (req, res) => {
    if (req.body) {
        Post_1.default.create(req.body)
            .then((post) => {
            res.json(post);
        })
            .catch((err) => {
            res.status(500).json(err);
        });
    }
    else {
        res.status(400).json("Empty body!");
    }
});
exports.default = router;
//# sourceMappingURL=posts.js.map