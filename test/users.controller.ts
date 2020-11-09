import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("User", () => {
  it("should add a new user", () =>
    request(Server).post("/api/v1/users").send({ name: "test" }).expect(201));

  it("should get an user by id", () =>
    request(Server)
      .get("/api/v1/users/1")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should get all users", () =>
    request(Server)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body).to.be.an("array").of.length(1);
      }));
});
