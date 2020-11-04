import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IPostModel extends mongoose.Document {
  post_id: number;
  title: string;
  location: string;
  requesting: boolean; // = true if post is requesting an item, = false if post is trading and item
  content: string;
  created_by: {
    user_id: number;
    username: string;
    full_name: string;
    avatar: string;
  };
  date: Date;
  status: string;
  tags: string[];
  comments: [
    {
      comment_id: number;
      created_by: {
        user_id: number;
        username: string;
        full_name: string;
        avatar: string;
      };
      comment: string;
    }
  ];
}

const poster = new mongoose.Schema({
  user_id: Number,
  username: String,
  full_name: String,
  avatar: String,
});

const commenter = new mongoose.Schema({
  user_id: Number,
  username: String,
  full_name: String,
  avatar: String,
});

const comment = new mongoose.Schema({
  comment_id: String,
  created_by: commenter,
  comment: String,
});

const posts = new mongoose.Schema(
  {
    post_id: { type: Number, unique: true },
    title: String,
    location: String,
    requesting: Boolean,
    content: String,
    created_by: poster,
    date: Date,
    status: String,
    tags: [String],
    comments: [comment],
  },
  {
    collection: "posts",
  }
);

posts.plugin(AutoIncrement, { inc_field: "post_id" });

export const Post = mongoose.model<IPostModel>("Post", posts);
