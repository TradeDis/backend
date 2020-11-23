import l from "../../common/logger";
import { Conversation, IConversationModel } from "../models/conversation";

import { Message, IMessageModel } from "../models/message";

export class MessagesService {
  async getAll(): Promise<IMessageModel[]> {
    l.info("fetch all messages");
    const messages = (await Message.find(null).lean()) as IMessageModel[];
    return messages;
  }

  async getAllByConversationId(
    conversation_id: number,
    limit: number = 20
  ): Promise<IMessageModel[]> {
    l.info("fetch all messages");
    const messages = (await Message.find({ conversation_id })
      .lean()
      .limit(limit)
      .sort({ createdAt: -1 })) as IMessageModel[];
    return messages;
  }

  async getById(id: number): Promise<IMessageModel> {
    l.info(`fetch message with message_id ${id}`);
    const message = (await Message.findOne(
      { message_id: id },
      "-_id -__v"
    ).lean()) as IMessageModel;
    return message;
  }

  async create(
    data: IMessageModel,
    fetchAll = false
  ): Promise<IMessageModel[]> {
    // l.info(`create message with data ${JSON.stringify(data)}`);
    const message = new Message(data);
    const doc = (await message.save()) as IMessageModel;
    const convo = (await Conversation.findOne({
      conversation_id: message.conversation_id,
    })) as IConversationModel;
    convo.latestMessage = {
      text: message.text,
      user: message.user,
    };
    await convo.save();
    let messages = [];
    if (fetchAll) {
      messages = await this.getAllByConversationId(doc.conversation_id);
    }
    return messages;
  }
}

export default new MessagesService();
