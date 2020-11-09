import l from "../../common/logger";

import { Conversation, IConversationModel } from "../models/conversation";

export class ConversationsService {
  async getAll(): Promise<IConversationModel[]> {
    l.info("fetch all conversations");
    const conversations = (await Conversation.find(
      null,
      "-_id -__v"
    ).lean()) as IConversationModel[];
    return conversations;
  }

  async getById(id: number): Promise<IConversationModel> {
    l.info(`fetch conversation with conversation_id ${id}`);
    const conversation = (await Conversation.findOne(
      { conversation_id: id },
      "-_id -__v"
    ).lean()) as IConversationModel;
    return conversation;
  }

  async getByMemberId(user_id: number): Promise<IConversationModel[]> {
    l.info(`fetch conversation by member id ${user_id}`);
    const conversation = (await Conversation.find(
      {
        members: {
          $elemMatch: {
            user_id,
          },
        },
      },
      "-_id -__v"
    ).lean()) as IConversationModel[];
    return conversation;
  }

  async create(data: IConversationModel): Promise<IConversationModel> {
    l.info(`create conversation with data ${data}`);
    const conversation = new Conversation(data);
    const doc = (await conversation.save()) as IConversationModel;
    return doc;
  }
}

export default new ConversationsService();
