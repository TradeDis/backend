import express from "express";
import { Application } from "express";
import path from "path";
import os from "os";
import cookieParser from "cookie-parser";
import installValidator from "./openapi";
import l from "./logger";
import morgan from "morgan";
import { IDatabase } from "./database";
import { socket_setup } from "../api/controllers/messages/controller";

export default class ExpressServer {
  app: Application;
  io: any;
  http: any;

  constructor() {
    const app = express();

    const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(morgan("dev"));
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    this.app = app;
  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(this.app, routes);
    return this;
  }

  database(db: IDatabase): ExpressServer {
    db.init();
    return this;
  }

  socket(): ExpressServer {
    this.http = require("http").createServer(this.app);
    this.io = require("socket.io")(this.http);
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = (port) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || "development"
        } @: ${os.hostname()} on port: ${port}`
      );
    socket_setup(this.io);
    this.http.listen(p, welcome(p));
    return this.app;
  }
}
