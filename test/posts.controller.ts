import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("post", () => {
  it("should add a new post", () =>
    request(Server).post("/api/v1/posts").send({ name: "test" }).expect(201));

  it("should get an post by id", () =>
    request(Server)
      .get("/api/v1/posts/1")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should get an post by user id", () =>
    request(Server)
      .get("/api/v1/posts/user/1")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should get all posts", () =>
    request(Server)
      .get("/api/v1/posts")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body).to.be.an("array").of.length(1);
      }));
});
