import MessagesService from "../../services/messages.service";
import { Request, Response, NextFunction } from "express";

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
console.log(__dirname);
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

let sockets_room = {};
let rooms_sockets = {};
io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  socket.join("room", function () {
    console.log(socket.id + " now in rooms ", socket.rooms);
  });

  socket.on("add_room", (conversation_id) => {
    console.log("add_room", socket.id);
    if (rooms_sockets[conversation_id]) {
      rooms_sockets[conversation_id][socket.id] = socket;
    } else {
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
    if (sockets_room[socket.id]) delete sockets_room[socket.id];
    console.log(Object.keys(rooms_sockets));
    console.log(sockets_room);
    // else the socket will automatically try to reconnect
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});

export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await MessagesService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getAllByConversationId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const doc = await MessagesService.getAllByConversationId(
        parseInt(req.params.conversation_id)
      );
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Message not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await MessagesService.getById(
        parseInt(req.params.message_id)
      );
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Message not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query.socket_id);
      req.body.conversation_id = parseInt(req.params.conversation_id);
      // validation would be handled in the Message model
      const doc = await MessagesService.create(req.body);
      Object.values(rooms_sockets[req.params.conversation_id]).forEach(
        (socket: any) => {
          if (socket.id != req.query.socket_id) {
            console.log(
              "updating ",
              socket.id,
              " to ",
              req.body.conversation_id
            );
            socket.emit("update", "hi");
          }
        }
      );
      return res.status(201).json(doc);
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
