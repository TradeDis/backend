import l from "../../common/logger";

import { User, IUserModel } from "../models/user";

export class UsersService {
  async getAll(): Promise<IUserModel[]> {
    l.info("fetch all users");
    const examples = (await User.find(
      null,
      "-_id -__v"
    ).lean()) as IUserModel[];
    return examples;
  }

  async getById(id: number): Promise<IUserModel> {
    l.info(`fetch user with id ${id}`);
    const example = (await User.findOne(
      { id: id },
      "-_id -__v"
    ).lean()) as IUserModel;
    return example;
  }

  async create(data: IUserModel): Promise<IUserModel> {
    l.info(`create user with data ${data}`);
    const example = new User(data);
    const doc = (await example.save()) as IUserModel;
    return doc;
  }
}

export default new UsersService();
