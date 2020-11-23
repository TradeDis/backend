import l from "../../common/logger";

import { Post, IPostModel } from "../models/post";

export class PostsService {
  async getAll(): Promise<IPostModel[]> {
    l.info("fetch all posts");
    const posts = (await Post.find(null).sort({
      updatedAt: "desc",
    })) as IPostModel[];
    return posts;
  }

  async getById(id: number): Promise<IPostModel> {
    l.info(`fetch post with post_id ${id}`);
    const post = (await Post.findOne(
      { post_id: id },
      "-_id -__v"
    ).lean()) as IPostModel;
    return post;
  }

  async getByUserId(user_id: number): Promise<IPostModel[]> {
    l.info(`fetch post with user_id ${user_id}`);
    const posts = (await Post.find(
      { "created_by.user_id": user_id },
      "-_id -__v"
    ).lean()) as IPostModel[];
    return posts;
  }

  async create(data: IPostModel): Promise<IPostModel> {
    l.info(`create post with data ${data}`);
    const post = new Post(data);
    const doc = (await post.save()) as IPostModel;
    return doc;
  }

  //this function uses the post_id and returns an updated postModel
  async updatePostById(data: IPostModel, post_id: number): Promise<IPostModel> {
    l.info(`update the post data ${data}`);
    const filter = { post_id: post_id };
    return (await Post.findOneAndUpdate(filter, data).exec()) as IPostModel;
  }
}

export default new PostsService();
