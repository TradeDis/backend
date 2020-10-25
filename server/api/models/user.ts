import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IUserModel extends mongoose.Document {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  reviews: [
    {
      review_id: number;
      review: string;
      rating: number;
      created_at: Date;
      updated_at: Date;
      created_by: {
        reviewer_id: number;
        username: string;
        first_name: string;
        last_name: string;
        avatar: string;
      };
    }
  ];
}

const reviewer = new mongoose.Schema({
  reviewer_id: Number,
  username: String,
  first_name: String,
  last_name: String,
  avatar: String,
});

const review = new mongoose.Schema(
  {
    review_id: { type: Number, unique: true },
    created_by: reviewer,
    review: String,
    rating: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

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
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "users",
  }
);

users.plugin(AutoIncrement, { inc_field: "user_id" });

export const User = mongoose.model<IUserModel>("User", users);
