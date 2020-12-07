import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const uniqueValidator = require("mongoose-unique-validator");
import { isEmail } from "validator";

const AutoIncrement = sequence(mongoose);

export interface IUserModel extends mongoose.Document {
  push_token: string;
  user_id: number;
  username: string;
  name: string;
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
    created_by: reviewer,
    review: String,
    rating: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
var validateEmail = function (email) {
  if (email.endsWith("@uwaterloo.ca")) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  } else {
    return false;
  }
};
const users = new mongoose.Schema(
  {
    push_token: String,
    user_id: { type: Number, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [
        { validator: isEmail, message: "Oops..please enter valid email" },
        {
          validator: validateEmail,
          message: "Oops..please enter a valid University of Waterloo email",
        },
      ],
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    address: String,
    avatar: String,
    reviews: { type: [review], required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "users",
  }
);

class UserClass {
  first_name!: string;
  last_name!: string;
  // `fullName` becomes a virtual
  get name() {
    return `${this.first_name} ${this.last_name}`;
  }

  // `getFullName()` becomes a document method
  getFullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

users.loadClass(UserClass);

users.plugin(AutoIncrement, { inc_field: "user_id" });
// Apply the uniqueValidator plugin to userSchema.
users.plugin(uniqueValidator);

export const User = mongoose.model<IUserModel>("User", users);
