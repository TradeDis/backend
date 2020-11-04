import express from "express";
import controller from "./controller";
export default express
  .Router()
  .post("/", controller.create)
  .get("/", controller.getAll)
  .get("/:user_id", controller.getById)
  .put("/:user_id", controller.updateById);
