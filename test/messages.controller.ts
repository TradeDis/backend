import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("Message", () => {
  it("should add a new message", () =>
    request(Server)
      .post("/api/v1/messages")
      .send({ name: "test" })
      .expect(201));

  it("should get an message by id", () =>
    request(Server)
      .get("/api/v1/messages/1")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should get all messages", () =>
    request(Server)
      .get("/api/v1/messages")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body).to.be.an("array").of.length(1);
      }));
});
