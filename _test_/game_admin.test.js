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


    const newCategories = JSON.parse(fs.readFileSync('./_test_/data/category.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    const newGamesCounting = JSON.parse(fs.readFileSync('./_test_/data/Counting.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    const newGamesLearning = JSON.parse(fs.readFileSync('./_test_/data/learning.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })

    await sequelize.queryInterface.bulkInsert('Categories', newCategories, {})
    await sequelize.queryInterface.bulkInsert('Games', newGamesCounting, {})
    await sequelize.queryInterface.bulkInsert('Games', newGamesLearning, {})
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
    it("Should fetch all games", () => {
      return request(app)
        .get("/users/games")
        .set("access_token", token)
        .then((response) => {
          console.log(response.body, "<<<<<<<<<<<<<<<<<<<<<<,,response test")
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

    it("Should not fetch all games (because there is no access token)", () => {
      return request(app)
        .get("/users/games")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message", expect.any(String));
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
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });
  });

  describe("/delete games", () => {
    it("success delete games and response 200", () => {
        return request(app)
          .delete("/users/games/1")
          .set("access_token", token)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", expect.any(String));
          });
    });
  })
});
