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
const push_notification_1 = require("../../../common/push_notification");
const users_service_1 = __importDefault(require("../../services/users.service"));
logger_1.default.info("message controller");
let sockets_room = {};
let rooms_sockets = {};
function socket_setup(io) {
    io.on("connection", (socket) => {
        console.log("a user connected " + socket.id);
        socket.join("room", function () {
            console.log(socket.id + " now in rooms ", socket.rooms);
        });
        socket.on("start_typing", ({ socket_id, conversation_id }) => {
            console.log("start_typing");
            Object.values(rooms_sockets[conversation_id]).forEach(({ socket }) => {
                if (socket.id != socket_id) {
                    console.log("broadcast ", socket_id, " typing to room", conversation_id);
                    socket.emit("start_typing", "start");
                }
            });
        });
        socket.on("end_typing", ({ socket_id, conversation_id }) => {
            console.log("end typing");
            Object.values(rooms_sockets[conversation_id]).forEach(({ socket }) => {
                if (socket.id != socket_id) {
                    console.log("broadcast ", socket_id, "stop typing to room", conversation_id);
                    socket.emit("end_typing", "end");
                }
            });
        });
        socket.on("add_room", ({ conversation_id, user_id }) => {
            console.log("add_room", socket.id);
            if (rooms_sockets[conversation_id]) {
                rooms_sockets[conversation_id][socket.id] = { socket, user_id };
            }
            else {
                rooms_sockets[conversation_id] = { [socket.id]: { socket, user_id } };
            }
            sockets_room[socket.id] = conversation_id;
            // console.log(Object.keys(sockets_room));
            // console.log(sockets_room);
        });
        // console.log(Object.keys(sockets));
        socket.on("disconnect", (reason) => {
            console.log("disconnected ", socket.id);
            if (rooms_sockets[sockets_room[socket.id]])
                delete rooms_sockets[sockets_room[socket.id]][socket.id];
            if (sockets_room[socket.id])
                delete sockets_room[socket.id];
            // console.log(Object.keys(ro
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
                let { conversation, newMessage } = req.body;
                const { conversation_id } = req.params;
                const { socket_id } = req.query;
                console.log(req.body);
                console.log(socket_id);
                newMessage.conversation_id = parseInt(conversation_id);
                // validation would be handled in the Message model
                const doc = yield messages_service_1.default.create(newMessage, true);
                console.log("Pushing updating signal....");
                if (socket_id) {
                    console.log(rooms_sockets);
                    Object.values(rooms_sockets[conversation_id]).forEach(({ socket }) => {
                        if (socket.id != socket_id) {
                            console.log("updating ", socket.id, " to ", req.body.conversation_id);
                            socket.emit("update", "hi");
                        }
                    });
                }
                let recipients = conversation.members.filter((member) => {
                    return (
                        // skip sending notification to the sender and users who are in the chat
                        member.user_id != newMessage.user.user_id &&
                        !Object.values(rooms_sockets[conversation_id]).some((socket_member) => member.user_id == socket_member.user_id));
                });
                console.log(recipients);
                recipients = yield Promise.all(recipients.map((member) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield users_service_1.default.getById(member.user_id);
                    return user.push_token;
                })));
                console.log(recipients);
                push_notification_1.send(recipients, {
                    sound: "default",
                    title: `📣 New message for ${conversation.name}`,
                    body: `${newMessage.user.name}: ${newMessage.text}`,
                    data: { withSome: "data" },
                });
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