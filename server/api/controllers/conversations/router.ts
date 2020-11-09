import express from "express";
import controller from "./controller";
import message_controller from "../messages/controller";
export default express
  .Router()
  .post("/", controller.create)
  // .post("/login", controller.login)
  .get("/", controller.getAll)
  .get("/:conversation_id/messages", message_controller.getAllByConversationId)
  .post("/:conversation_id/messages", message_controller.create);

// .get("/:user_id", controller.getById)
// .put("/:user_id", controller.updateById);
