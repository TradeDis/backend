"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const openapi_1 = __importDefault(require("./openapi"));
const logger_1 = __importDefault(require("./logger"));
const morgan_1 = __importDefault(require("morgan"));
const controller_1 = require("../api/controllers/messages/controller");
class ExpressServer {
    constructor() {
        const app = express_1.default();
        const root = path_1.default.normalize(__dirname + "/../..");
        app.set("appPath", root + "client");
        app.use(morgan_1.default("dev"));
        app.use(express_1.default.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
        app.use(express_1.default.urlencoded({
            extended: true,
            limit: process.env.REQUEST_LIMIT || "100kb",
        }));
        app.use(cookie_parser_1.default(process.env.SESSION_SECRET));
        app.use(express_1.default.static(`${root}/public`));
        this.app = app;
    }
    router(routes) {
        openapi_1.default(this.app, routes);
        return this;
    }
    database(db) {
        db.init();
        return this;
    }
    socket() {
        this.http = require("http").createServer(this.app);
        this.io = require("socket.io")(this.http);
        return this;
    }
    listen(p = process.env.PORT) {
        const welcome = (port) => () => logger_1.default.info(`up and running in ${process.env.NODE_ENV || "development"} @: ${os_1.default.hostname()} on port: ${port}`);
        controller_1.socket_setup(this.io);
        this.http.listen(p, welcome(p));
        return this.app;
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=server.js.map