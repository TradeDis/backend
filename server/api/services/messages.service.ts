import l from "../../common/logger";

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

  async create(data: IMessageModel): Promise<IMessageModel[]> {
    // l.info(`create message with data ${JSON.stringify(data)}`);
    const message = new Message(data);
    const doc = (await message.save()) as IMessageModel;
    const messages = await this.getAllByConversationId(doc.conversation_id);
    return messages;
  }
}

export default new MessagesService();
