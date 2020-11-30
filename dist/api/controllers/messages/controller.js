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
exports.Controller = exports.socket_setup = void 0;
const messages_service_1 = __importDefault(require("../../services/messages.service"));
const logger_1 = __importDefault(require("../../../common/logger"));
logger_1.default.info("message controller");
let sockets_room = {};
let rooms_sockets = {};
function socket_setup(io) {
    io.on("connection", (socket) => {
        console.log("a user connected " + socket.id);
        socket.join("room", function () {
            console.log(socket.id + " now in rooms ", socket.rooms);
        });
        socket.on("add_room", (conversation_id) => {
            console.log("add_room", socket.id);
            if (rooms_sockets[conversation_id]) {
                rooms_sockets[conversation_id][socket.id] = socket;
            }
            else {
                rooms_sockets[conversation_id] = { [socket.id]: socket };
            }
            sockets_room[socket.id] = conversation_id;
            console.log(Object.keys(sockets_room));
            console.log(sockets_room);
        });
        // console.log(Object.keys(sockets));
        socket.on("disconnect", (reason) => {
            console.log("disconnected ", socket.id);
            if (rooms_sockets[sockets_room[socket.id]])
                delete rooms_sockets[sockets_room[socket.id]][socket.id];
            if (sockets_room[socket.id])
                delete sockets_room[socket.id];
            console.log(Object.keys(rooms_sockets));
            console.log(sockets_room);
            // else the socket will automatically try to reconnect
        });
    });
    logger_1.default.info("Socket updated!");
}
exports.socket_setup = socket_setup;
class Controller {
    update(sockets_room, rooms_sockets) {
        // this.sockets_room = sockets_room;
        // this.rooms_sockets = rooms_sockets;
        logger_1.default.info("Updating rooms...");
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield messages_service_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAllByConversationId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield messages_service_1.default.getAllByConversationId(parseInt(req.params.conversation_id));
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Message not found" }];
                return res.status(404).json({ errors });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield messages_service_1.default.getById(parseInt(req.params.message_id));
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "Message not found" }];
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
                console.log(req.body);
                console.log(req.query.socket_id);
                req.body.conversation_id = parseInt(req.params.conversation_id);
                // validation would be handled in the Message model
                const doc = yield messages_service_1.default.create(req.body, true);
                console.log("Pushing updating signal....");
                if (req.query.socket_id) {
                    console.log(rooms_sockets);
                    Object.values(rooms_sockets[req.params.conversation_id]).forEach((socket) => {
                        if (socket.id != req.query.socket_id) {
                            console.log("updating ", socket.id, " to ", req.body.conversation_id);
                            socket.emit("update", "hi");
                        }
                    });
                }
                return res.status(201).json(doc);
            }
            catch (err) {
                console.log(err);
                return next(err);
            }
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map