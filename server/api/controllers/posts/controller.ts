import PostsService from "../../services/posts.service";
import { Request, Response, NextFunction } from "express";

export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await PostsService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.getById(parseInt(req.params.post_id)); //query param is a string, must convert to number with parseInt
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Post not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.create(req.body);
      return res
        .status(201)
        .location(`/api/v1/examples/${doc.id}`)
        .end();
    } catch (err) {
      return next(err);
    }
  }
}
export default new Controller();
