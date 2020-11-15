"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    example_id: { type: Number, unique: true },
    name: String,
    type: String,
}, {
    collection: "examples",
});
schema.plugin(AutoIncrement, { inc_field: "example_id" });
exports.Example = mongoose_1.default.model("Example", schema);
//# sourceMappingURL=example.js.map