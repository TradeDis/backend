"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_openapi_validator_1 = require("express-openapi-validator");
const error_handler_1 = __importDefault(require("../api/middlewares/error.handler"));
function openapi(app, routes) {
    const apiSpec = path_1.default.join(__dirname, "api.yml");
    app.use(process.env.OPENAPI_SPEC || "/spec", express_1.default.static(apiSpec));
    new express_openapi_validator_1.OpenApiValidator({
        apiSpec,
    }).install(app);
    routes(app);
    app.use(error_handler_1.default);
}
exports.default = openapi;
//# sourceMappingURL=openapi.js.map