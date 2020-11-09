import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export interface User extends mongoose.Document {
  _id: string | number;
  name?: string;
  avatar?: string;
}
export interface IConversationModel extends mongoose.Document {
  conversation_id: number;
  name: string;
  members: User[];
  post_id: Number;
  latestMessage: {
    text: string;
    user: User;
  };
}

const user = new mongoose.Schema({
  user_id: Number,
  name: String,
  avatar: String,
});

const conversations = new mongoose.Schema(
  {
    conversation_id: { type: Number, unique: true },
    name: String,
    members: [user],
    // reference to the post
    post_id: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "conversations",
  }
);

conversations.plugin(AutoIncrement, { inc_field: "conversation_id" });

export const Conversation = mongoose.model<IConversationModel>(
  "Conversation",
  conversations
);

/* 
{
  "members": [{
      "user_id": 3,
      "name": "alan wu"
  },{
 "user_id": 2,
      "name": "henry wu"
  }],
  "name": "conversation 3",
  "post_id": 3
}
*/
