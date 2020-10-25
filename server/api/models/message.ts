import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface IMessageModel extends mongoose.Document {
  // TODO
}

const messages = new mongoose.Schema(
  {
    message_id: { type: Number, unique: true },
    // TODO
  },
  {
    collection: "messages",
  }
);

messages.plugin(AutoIncrement, { inc_field: "message_id" });

export const Message = mongoose.model<IMessageModel>("Post", messages);
