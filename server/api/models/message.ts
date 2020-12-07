import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface User extends mongoose.Document {
  _id: string | number;
  user_id: number;
  name?: string;
  avatar?: string;
}

export interface IMessageModel extends mongoose.Document {
  message_id: string | number;
  conversation_id: number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

const user = new mongoose.Schema({
  user_id: Number,
  name: String,
  avatar: String,
});

const messages = new mongoose.Schema(
  {
    conversation_id: { type: Number, required: true },
    message_id: { type: Number, unique: true },
    text: { type: String, required: true },
    user: { type: user, required: true },
    image: String,
    video: String,
    audio: String,
    system: Boolean,
    sent: Boolean,
    received: Boolean,
    pending: Boolean,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "messages",
  }
);

messages.plugin(AutoIncrement, { inc_field: "message_id" });

export const Message = mongoose.model<IMessageModel>("Message", messages);
