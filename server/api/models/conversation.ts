import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IConversationsModel extends mongoose.Document {
  // TODO
}

const conversations = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    // TODO
  },
  {
    collection: "conversations",
  }
);

conversations.plugin(AutoIncrement, { inc_field: "id" });

export const Post = mongoose.model<IConversationsModel>("Post", conversations);
