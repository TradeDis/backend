import express from "express";
import controller from "./controller";
export default express
  .Router()
  .post("/", controller.create)
  .get("/", controller.getAll)
  .get("/:post_id", controller.getById)
  .get("/user/:user_id", controller.getByUserId)
  .put("/:post_id", controller.updatePostById);
