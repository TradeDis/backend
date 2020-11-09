import MessagesService from "../../services/messages.service";
import { Request, Response, NextFunction } from "express";

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
      req.body.conversation_id = parseInt(req.params.conversation_id);
      // validation would be handled in the Message model
      const doc = await MessagesService.create(req.body);
      return res.status(201).json(doc);
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
