import PostsService from "../../services/posts.service";
import { Request, Response, NextFunction } from "express";
import ConversationsService from "../../services/conversations.service";
import MessagesService from "../../services/messages.service";
export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await PostsService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.getById(parseInt(req.params.post_id)); //query param is a string, must convert to number with parseInt
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Post not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.getByUserId(parseInt(req.params.user_id)); //query param is a string, must convert to number with parseInt
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Post not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async getByProposerId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.getByProposerId(
        parseInt(req.params.user_id)
      ); //query param is a string, must convert to number with parseInt
      if (doc) {
        return res.status(200).json(doc);
      }
      const errors = [{ message: "Post not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.create(req.body);
      // send({
      //   sound: "default",
      //   body: "A post is created",
      //   data: { withSome: "data" },
      // });
      return res.status(201).location(`/api/v1/examples/${doc.id}`).end();
    } catch (err) {
      return next(err);
    }
  }

  async updatePostById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await PostsService.updatePostById(
        req.body,
        parseInt(req.params.post_id)
      );
      console.log(doc);
      return res.status(201).json(doc);
    } catch (err) {
      return next(err);
    }
  }
  async propose(req: Request, res: Response, next: NextFunction) {
    console.log("Propose");
    const { post_id } = req.params;

    let { conversation, systemMessage, firstMessage, proposer } = req.body;
    try {
      const new_conversation = await ConversationsService.create(conversation);
      systemMessage.conversation_id = new_conversation.conversation_id;
      await MessagesService.create(systemMessage);
      firstMessage.conversation_id = new_conversation.conversation_id;
      await MessagesService.create(firstMessage);
      const post = await PostsService.getById(parseInt(post_id));
      post.proposers.push(proposer);
      await post.save();
      return res.status(201).json(post);
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
