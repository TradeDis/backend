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
      const doc = await UsersService.getById(parseInt(req.params.user_id));
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
      const doc = await UsersService.create(req.body);
      return res.status(201).location(`/api/v1/users/${doc.user_id}`).json(doc);
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

  async update_push_token(req: Request, res: Response, next: NextFunction) {
    try {
      const { push_token } = req.body;

      const user = await UsersService.update_push_token(
        parseInt(req.params.user_id),
        push_token
      );

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      // validation would be handled in the User model
      const user = await UsersService.getBy("email", email);
      // prevent user from being null
      const isAuth = user ? user.password == password : false;
      return res.status(200).json({ result: isAuth, user });
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
