import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IPostModel extends mongoose.Document {
  // TODO
}

const posts = new mongoose.Schema(
  {
    post_id: { type: Number, unique: true },
    // TODO
  },
  {
    collection: "posts",
  }
);

posts.plugin(AutoIncrement, { inc_field: "post_id" });

export const Post = mongoose.model<IPostModel>("Post", posts);
