import l from "../../common/logger";

import { User, IUserModel } from "../models/user";

export class UsersService {
  async getAll(): Promise<string[]> {
    l.info("fetch all users");
    const users = (await User.find(null, "-_id -__v").lean()) as any[];
    // const usersname = users.map((user) => user.getFullName());
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

  async update_push_token(
    user_id: number,
    push_token: string
  ): Promise<IUserModel> {
    l.info(`updating user ${user_id} token: ${push_token}`);
    const doc = await User.findOneAndUpdate(
      { user_id: user_id },
      { push_token: push_token },
      // If `new` isn't true, `findOneAndUpdate()` will return the
      // document as it was _before_ it was updated.
      { new: true }
    );
    return doc;
  }
}

export default new UsersService();
