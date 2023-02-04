const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
let token = ''

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "customers1",
      email: "customers1@gmail.com",
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
      id: user.id,
    });

    await sequelize.queryInterface.bulkInsert("Categories", [
      {
        name: "Counting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Guessing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ,
      {
        name: "Learning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await sequelize.queryInterface.bulkInsert("Games", [
      {
        id: 1,
        imgUrl: "https://i.imgur.com/9q8ZBR4.jpg",
        answer: "2",
        lvl: 1,
        question: "ada berapa macan dalam gambar tersebut? yuk coba hitung!",
        CategoryId: 1,
        optionA: "3",
        optionB: "1",
        optionC: "2",
        optionD: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        imgUrl: "https://i.imgur.com/sEIxa5X.jpg",
        answer: "7",
        lvl: 2,
        question: "ada berapa kambing dalam gambar tersebut? yuk coba hitung!",
        CategoryId: 1,
        optionA: "6",
        optionB: "7",
        optionC: "5",
        optionD: "8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        imgUrl: "https://i.imgur.com/152hco9.jpg",
        answer: "5",
        lvl: 3,
        question: "ada berapa sapi dalam gambar tersebut? yuk coba hitung!",
        CategoryId: 1,
        optionA: "5",
        optionB: "4",
        optionC: "6",
        optionD: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        imgUrl: "https://i.imgur.com/5XfGOeQ.jpg",
        answer: "3",
        lvl: 4,
        question: "ada berapa kukang dalam gambar tersebut? yuk coba hitung!",
        CategoryId: 1,
        optionA: "4",
        optionB: "3",
        optionC: "2",
        optionD: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        imgUrl: "https://i.imgur.com/uV4XwKy.jpg",
        answer: "2",
        lvl: 5,
        question: "ada berapa jerapah dalam gambar tersebut? yuk coba hitung!",
        CategoryId: 1,
        optionA: "4",
        optionB: "3",
        optionC: "2",
        optionD: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
    // await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
    // await sequelize.queryInterface.bulkDelete("Categories", null, { truncate: true, cascade: true, restartIdentity: true })
    // await sequelize.queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true })
});

describe("games", () => {
  describe("GET /games", () => {
    it.only("Should fetch games all games based on category", () => {
      return request(app)
        .get("/users/games")
        .set("access_token", token)
        .then((response) => {
            console.log(response.body, "<<<<<<<<<<<<<<<<<<<<<< response")
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("data", expect.any(Array));
        });
    });

    it("Shouldnot fetch games all games based on category (not found)", () => {
      return request(app)
        .get("/category/:categoryId")
        .set("access_token", token)
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Shouldnot fetch games all games based on category (because there is not access token)", () => {
      return request(app)
        .get("/category/:categoryId")
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Should fetch games on id", () => {
      return request(app)
        .get("/games/:gamesId")
        .set("access_token", token)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("imgUrl", expect.any(String));
          expect(response.body).toHaveProperty("answer", expect.any(String));
          expect(response.body).toHaveProperty("lvl", expect.any(String));
          expect(response.body).toHaveProperty("question", expect.any(String));
          expect(response.body).toHaveProperty(
            "categoryId",
            expect.any(Number)
          );
          expect(response.body).toHaveProperty("optionA", expect.any(String));
          expect(response.body).toHaveProperty("optionB", expect.any(String));
          expect(response.body).toHaveProperty("optionC", expect.any(String));
          expect(response.body).toHaveProperty("optionD", expect.any(String));
          expect(response.body).toHaveProperty(
            "categoryId",
            expect.any(Number)
          );
          expect(response.body).toHaveProperty("Category", expect.any(Object));
          expect(response.body).toHaveProperty(
            "access_token",
            expect.any(String)
          );
          expect(response.body.Category).toHaveProperty(
            "name",
            expect.any(String)
          );
        });
    });

    it("Shouldnot fetch games on id (cannot access)", () => {
      return request(app)
        .get("/games/:gamesId")
        .set("access_token", token)
        .then((response) => {
          expect(response.status).toBe(403);
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

    it("Shouldnot fetch games on id (because there is not access token)", () => {
      return request(app)
        .get("/games/:gamesId")
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

    it("Should answer games on id (wrong)", () => {
      return request(app)
        .post("/games/:gamesId")
        .set("access_token", token)
        .send({
          answer: "Jawaban B",
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
