"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    init() {
        mongoose_1.default.Promise = bluebird_1.default;
        mongoose_1.default
            .connect(this.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
        })
            .then(() => {
            logger_1.default.info("Database connected.");
        })
            .catch((err) => {
            logger_1.default.error("MongoDB connection error. Please make sure MongoDB is running.\n" +
                err);
            process.exit(1);
        });
        const db = mongoose_1.default.connection;
        db.on("error", (err) => logger_1.default.error("MongoDB error:\n" + err));
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map