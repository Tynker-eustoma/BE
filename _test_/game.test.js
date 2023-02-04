const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const fs = require("fs");
let token;
beforeAll(async () => {
  try {
    const user = await User.create({
      username: "customers1",
      email: "customers3@gmail.com",
      password: "password",
      age: 5,
      lvlCount: 1,
      lvlGuess: 1,
      lvlLearn: 1,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    token = signToken({
      id: 1,
    });

    console.log(token, "ini token<<<<<<<<<<<<<<<<<<<<<<<<<<");

    const games = JSON.parsefs(
      fs.readFileSync("./_test_/data/Counting.json", "utf-8")
    ).map((x) => {
      x.createdAt = x.updatedAt = new Date();
      return x;
    });

    const newData = JSON.parse(
      fs.readFileSync("./_test_/data/category.json", "utf-8")
    ).map((x) => {
      x.createdAt = x.updatedAt = new Date();
      return x;
    });

    await sequelize.queryInterface.bulkInsert("Games", games, {});
    await sequelize.queryInterface.bulkInsert("Categories", newData, {});
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Games", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("games", () => {
  describe("GET /games", () => {
    it("Should fetch all games based on category", () => {
      return request(app)
        .get("/users/games")
        .set("access_token", token)
        .then((response) => {
          console.log(response.body, "<<<<<<<<<<<<<<<<<<<<<< response");
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expect.any(Array));
          expect(response.body[0]).toHaveProperty(
            "CategoryId",
            expect.any(Number)
          );
          expect(response.body[0]).toHaveProperty("answer", expect.any(String));
          expect(response.body[0]).toHaveProperty(
            "createdAt",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty(
            "updatedAt",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty("id", expect.any(Number));
          expect(response.body[0]).toHaveProperty("lvl", expect.any(Number));
          expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
          expect(response.body[0]).toHaveProperty(
            "optionA",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty(
            "optionB",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty(
            "optionC",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty(
            "optionD",
            expect.any(String)
          );
          expect(response.body[0]).toHaveProperty(
            "question",
            expect.any(String)
          );
        });
    });

    it("Shouldnot fetch games all games based on category (because there is no access token)", () => {
      return request(app)
        .get("/users/games")
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Shouldnot fetch games on id (not found)", () => {
      return request(app)
        .get("/games/:gamesId")
        .set("access_token", token)
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Should answer games on id (right)", () => {
      return request(app)
        .post("/games/:gamesId")
        .set("access_token", token)
        .send({
          answer: "Jawaban A",
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("message", expect.any(String));
          expect(response.body).toHaveProperty(
            "access_token",
            expect.any(String)
          );
        });
    });
  });

  describe("/post games", () => {
    it("create a new game", () => {
      return request(app)
        .post("/users/games")
        .set("access_token", token)
        .send({
          imgUrl: "https://i.imgur.com/9q8ZBR4.jpg",
          answer: "2",
          lvl: 1,
          question: "ada berapa macan dalam gambar tersebut? yuk coba hitung!",
          CategoryId: 1,
          optionA: "3",
          optionB: "1",
          optionC: "2",
          optionD: "4",
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Should answer games on id (because there is not access token)", () => {
      return request(app)
        .post("/games/:gamesId")
        .send({
          answer: "Jawaban B",
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });
  });
});
