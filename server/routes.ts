import { Application } from "express";
import examplesRouter from "./api/controllers/examples/router";
import usersRouter from "./api/controllers/users/router";
import postsRouter from "./api/controllers/posts/router";
import conversationsRouter from "./api/controllers/conversations/router";

export default function routes(app: Application): void {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/posts", postsRouter);
  app.use("/api/v1/conversations", conversationsRouter);
}
