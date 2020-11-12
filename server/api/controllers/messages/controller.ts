import MessagesService from "../../services/messages.service";
import { Request, Response, NextFunction } from "express";

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
console.log(__dirname);
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

let sockets = {};
io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  sockets[socket.id] = socket;
  console.log(Object.keys(sockets));
  socket.on("disconnect", (socket) => {
    console.log("disconnected");
    delete sockets[socket.id];
    console.log(Object.keys(sockets));
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
      console.log(req.params.socket_id);
      req.body.conversation_id = parseInt(req.params.conversation_id);
      // validation would be handled in the Message model
      const doc = await MessagesService.create(req.body);
      Object.values(sockets).forEach((socket: any) => {
        socket.emit("chat", "hi");
      });
      return res.status(201).json(doc);
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
