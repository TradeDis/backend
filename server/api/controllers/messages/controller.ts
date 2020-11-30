import MessagesService from "../../services/messages.service";
import { Request, Response, NextFunction } from "express";
import l from "../../../common/logger";
import { send } from "../../../common/push_notification";
import UsersService from "../../services/users.service";

l.info("message controller");

let sockets_room = {};
let rooms_sockets = {};
export function socket_setup(io) {
  io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);
    socket.join("room", function () {
      console.log(socket.id + " now in rooms ", socket.rooms);
    });
    socket.on("start_typing", ({ socket_id, conversation_id }) => {
      console.log("start_typing");
      Object.values(rooms_sockets[conversation_id]).forEach(
        ({ socket }: any) => {
          if (socket.id != socket_id) {
            console.log(
              "broadcast ",
              socket_id,
              " typing to room",
              conversation_id
            );
            socket.emit("start_typing", "start");
          }
        }
      );
    });

    socket.on("end_typing", ({ socket_id, conversation_id }) => {
      console.log("end typing");
      Object.values(rooms_sockets[conversation_id]).forEach(
        ({ socket }: any) => {
          if (socket.id != socket_id) {
            console.log(
              "broadcast ",
              socket_id,
              "stop typing to room",
              conversation_id
            );
            socket.emit("end_typing", "end");
          }
        }
      );
    });

    socket.on("add_room", ({ conversation_id, user_id }) => {
      console.log("add_room", socket.id);
      if (rooms_sockets[conversation_id]) {
        rooms_sockets[conversation_id][socket.id] = { socket, user_id };
      } else {
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
      if (sockets_room[socket.id]) delete sockets_room[socket.id];
      // console.log(Object.keys(ro
      // else the socket will automatically try to reconnect
    });
  });
  l.info("Socket updated!");
}

export class Controller {
  update(sockets_room, rooms_sockets) {
    // this.sockets_room = sockets_room;
    // this.rooms_sockets = rooms_sockets;
    l.info("Updating rooms...");
  }

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
      let { conversation, newMessage } = req.body;
      const { conversation_id } = req.params;
      const { socket_id } = req.query;
      console.log(req.body);

      console.log(socket_id);
      newMessage.conversation_id = parseInt(conversation_id);
      // validation would be handled in the Message model
      const doc = await MessagesService.create(newMessage, true);
      console.log("Pushing updating signal....");
      if (socket_id) {
        console.log(rooms_sockets);
        Object.values(rooms_sockets[conversation_id]).forEach(
          ({ socket }: any) => {
            if (socket.id != socket_id) {
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
      }

      let recipients = conversation.members.filter((member) => {
        return (
          // skip sending notification to the sender and users who are in the chat
          member.user_id != newMessage.user.user_id &&
          !Object.values(rooms_sockets[conversation_id]).some(
            (socket_member: any) => member.user_id == socket_member.user_id
          )
        );
      });

      console.log(recipients);

      recipients = await Promise.all(
        recipients.map(async (member) => {
          const user = await UsersService.getById(member.user_id);
          return user.push_token;
        })
      );

      console.log(recipients);

      send(recipients, {
        sound: "default",
        title: `📣 New message for ${conversation.name}`,
        body: `${newMessage.user.name}: ${newMessage.text}`,
        data: { withSome: "data" },
      });

      return res.status(201).json(doc);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
}

export default new Controller();
