import express from "express";
import controller from "./controller";
export default express
  .Router()
  .post("/", controller.create)
  .get("/", controller.getAll)
  .get("/:post_id", controller.getById)
  .get("/user/:user_id", controller.getByUserId)
  .get("/proposer/:user_id", controller.getByProposerId)
  .put("/:post_id", controller.updatePostById)
  .post("/:post_id/propose", controller.propose);
