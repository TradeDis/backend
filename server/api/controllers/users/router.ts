import express from "express";
import controller from "./controller";
import conversation from "../conversations/controller";
export default express
  .Router()
  .post("/", controller.create)
  .post("/login", controller.login)
  .get("/", controller.getAll)
  .get("/:user_id", controller.getById)
  .post("/:user_id/token", controller.update_push_token)
  .put("/:user_id", controller.updateById)
  .get("/:member_id/conversations", conversation.getByMemberId);
