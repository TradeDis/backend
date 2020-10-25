import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IConversationsModel extends mongoose.Document {
  // TODO
}

const conversations = new mongoose.Schema(
  {
    conversation_id: { type: Number, unique: true },
    // TODO
  },
  {
    collection: "conversations",
  }
);

conversations.plugin(AutoIncrement, { inc_field: "conversation_id" });

export const Post = mongoose.model<IConversationsModel>("Post", conversations);
