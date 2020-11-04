import l from "../../common/logger";

import { User, IUserModel } from "../models/user";

export class UsersService {
  async getAll(): Promise<IUserModel[]> {
    l.info("fetch all users");
    const users = (await User.find(null, "-_id -__v").lean()) as IUserModel[];
    return users;
  }

  async getById(user_id: number): Promise<IUserModel> {
    l.info(`fetch user with id ${user_id}`);
    const user = (await User.findOne(
      { user_id: user_id },
      "-_user_id -__v"
    ).lean()) as IUserModel;
    return user;
  }

  async create(data: IUserModel): Promise<IUserModel> {
    l.info(`create user with data ${data}`);
    const user = new User(data);
    const doc = (await user.save()) as IUserModel;
    return doc;
  }
  i;

  //this function uses the user_id and returns an updated userModel
  async updateById(data: IUserModel, user_id: number): Promise<IUserModel> {
    l.info(`update users data ${data}`);
    const filter = { user_id: user_id };
    return (await User.findOneAndUpdate(filter, data).exec()) as IUserModel;
  }

  async getBy(key: string, value: any): Promise<IUserModel> {
    const user = (await User.findOne(
      { [key]: value },
      "-_id -__v"
    ).lean()) as IUserModel;
    return user;
  }
}

export default new UsersService();
