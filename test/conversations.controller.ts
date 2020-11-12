import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("Converation", () => {
  it("should add a new converation", () =>
    request(Server)
      .post("/api/v1/converations")
      .send({ name: "test" })
      .expect(201));

  it("should get an converation by id", () =>
    request(Server)
      .get("/api/v1/converations/1")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should get all converations", () =>
    request(Server)
      .get("/api/v1/converations")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body).to.be.an("array").of.length(1);
      }));
});
