import l from "../../common/logger";

import { Post, IPostModel } from "../models/post";

export class PostsService {
  async getAll(): Promise<IPostModel[]> {
    l.info("fetch all posts");
    const posts = (await Post.find(null, "-_id -__v").lean()) as IPostModel[];
    return posts;
  }

  async getById(id: number): Promise<IPostModel> {
    l.info(`fetch post with id ${id}`);
    const post = (await Post.findOne(
      { id: id },
      "-_id -__v"
    ).lean()) as IPostModel;
    return post;
  }

  async create(data: IPostModel): Promise<IPostModel> {
    l.info(`create post with data ${data}`);
    const post = new Post(data);
    const doc = (await post.save()) as IPostModel;
    return doc;
  }
}

export default new PostsService();
