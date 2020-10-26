import UsersService from "../../services/users.service";
import { Request, Response, NextFunction } from "express";

export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await UsersService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UsersService.getById(parseInt(req.params.id));
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Example not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UsersService.create(req.body);
      return res.status(201).location(`/api/v1/examples/${doc.id}`).end();
    } catch (err) {
      return next(err);
    }
  }

  //this function calls updateById function in service
  //sends the user_id to the function and gets back a newly updated user model which it sends back to database
  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UsersService.updateById(
        req.body,
        parseInt(req.params.user_id)
      );
      return res.status(201).json(doc);
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
