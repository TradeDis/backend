"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./common/env");
const database_1 = __importDefault(require("./common/database"));
const server_1 = __importDefault(require("./common/server"));
const routes_1 = __importDefault(require("./routes"));
const port = parseInt(process.env.PORT || "3000");
const connectionString = process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TEST ||
            "mongodb://localhost:27017/express-mongoose-template"
        : process.env.MONGODB_URI ||
            "mongodb+srv://tradedis:tradedis2020@cluster0.ieu4n.mongodb.net/development?retryWrites=true&w=majority";
const db = new database_1.default(connectionString);
exports.default = new server_1.default().database(db).router(routes_1.default).socket().listen(port);
//# sourceMappingURL=index.js.map