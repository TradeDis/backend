import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IUserModel extends mongoose.Document {
  id: number;
  name: string;
}

const reviewer = new mongoose.Schema({
  reviewer_id: Number,
  username: String,
  first_name: String,
  last_name: String,
  avatar: String,
});

const review = new mongoose.Schema({
  review_id: { type: Number, unique: true },
  created_by: reviewer,
  date: Date,
  review: String,
  rating: Number,
});

review.plugin(AutoIncrement, { inc_field: "review_id" });

const users = new mongoose.Schema(
  {
    user_id: { type: Number, unique: true },
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    address: String,
    avatar: String,
    reviews: [review],
  },
  {
    collection: "users",
  }
);

users.plugin(AutoIncrement, { inc_field: "user_id" });

export const User = mongoose.model<IUserModel>("User", users);
