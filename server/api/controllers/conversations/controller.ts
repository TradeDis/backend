import ConversationsService from "../../services/conversations.service";
import { Request, Response, NextFunction } from "express";

export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await ConversationsService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getByMemberId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ConversationsService.getByMemberId(
        parseInt(req.params.member_id)
      );
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Conversations not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ConversationsService.getById(
        parseInt(req.params.conversation_id)
      );
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "User not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // validation would be handled in the User model
      const doc = await ConversationsService.create(req.body);
      return res
        .status(201)
        .location(`/api/v1/conversations/${doc.conversation_id}`)
        .json(doc);
    } catch (err) {
      return next(err);
    }
  }

  // //this function calls updateById function in service
  // //sends the conversation_id to the function and gets back a newly updated user model which it sends back to database
  // async updateById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const doc = await ConversationsService.updateById(
  //       req.body,
  //       parseInt(req.params.conversation_id)
  //     );
  //     return res.status(201).json(doc);
  //   } catch (err) {
  //     return next(err);
  //   }
  // }
}

export default new Controller();
