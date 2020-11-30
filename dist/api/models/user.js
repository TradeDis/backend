"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const uniqueValidator = require("mongoose-unique-validator");
const validator_1 = require("validator");
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const reviewer = new mongoose_1.default.Schema({
    reviewer_id: Number,
    username: String,
    first_name: String,
    last_name: String,
    avatar: String,
});
const review = new mongoose_1.default.Schema({
    created_by: reviewer,
    review: String,
    rating: Number,
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
var validateEmail = function (email) {
    if (email.endsWith("@uwaterloo.ca")) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }
    else {
        return false;
    }
};
const users = new mongoose_1.default.Schema({
    push_token: String,
    user_id: { type: Number, unique: true },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [
            { validator: validator_1.isEmail, message: "Oops..please enter valid email" },
            {
                validator: validateEmail,
                message: "Oops..please enter a valid University of Waterloo email",
            },
        ],
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    address: String,
    avatar: String,
    reviews: { type: [review], required: false },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "users",
});
class UserClass {
    // `fullName` becomes a virtual
    get name() {
        return `${this.first_name} ${this.last_name}`;
    }
    // `getFullName()` becomes a document method
    getFullName() {
        return `${this.first_name} ${this.last_name}`;
    }
}
users.loadClass(UserClass);
users.plugin(AutoIncrement, { inc_field: "user_id" });
// Apply the uniqueValidator plugin to userSchema.
users.plugin(uniqueValidator);
exports.User = mongoose_1.default.model("User", users);
//# sourceMappingURL=user.js.map