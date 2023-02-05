const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const fs = require('fs')

let token
beforeAll(async () => {
  try {
    await User.create({
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
    token = signToken({ id: 1 })

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
  await sequelize.queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true })
  await sequelize.queryInterface.bulkDelete("Categories", null, { truncate: true, cascade: true, restartIdentity: true })
  await sequelize.queryInterface.bulkDelete("Users", null, {truncate: true, cascade: true, restartIdentity: true,
  });
});

describe.skip("GET /games", () => {
  it("Should fetch games all games based on category 1 (Counting)", () => {
    return request(app)
      .get("/pub/games/1")
      .set("access_token", token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Array));
        expect(response.body[0]).toHaveProperty("CategoryId", expect.any(Number));
        expect(response.body[0]).toHaveProperty("answer", expect.any(String));
        expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
        expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
        expect(response.body[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body[0]).toHaveProperty("lvl", expect.any(Number));
        expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
        expect(response.body[0]).toHaveProperty("optionA", expect.any(String));
        expect(response.body[0]).toHaveProperty("optionB", expect.any(String));
        expect(response.body[0]).toHaveProperty("optionC", expect.any(String));
        expect(response.body[0]).toHaveProperty("optionD", expect.any(String));
        expect(response.body[0]).toHaveProperty("question", expect.any(String));
      });
  });

  it("Shouldnot fetch games all games based on category (not found)", () => {
    return request(app)
      .get("/pub/games/22")
      .set("access_token", token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });

  it("Shouldnot fetch games all games based on category (because there is not access token)", () => {
    return request(app)
      .get("/pub/games/1")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });

  it("Should fetch games on id", () => {
    return request(app)
      .get("/pub/games/play/1")
      .set("access_token", token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("imgUrl", expect.any(String));
        expect(response.body).toHaveProperty("answer", expect.any(String));
        expect(response.body).toHaveProperty("lvl", expect.any(Number));
        expect(response.body).toHaveProperty("question", expect.any(String));
        expect(response.body).toHaveProperty("CategoryId", expect.any(Number));
        expect(response.body).toHaveProperty("optionA", expect.any(String));
        expect(response.body).toHaveProperty("optionB", expect.any(String));
        expect(response.body).toHaveProperty("optionC", expect.any(String));
        expect(response.body).toHaveProperty("optionD", expect.any(String));
      });
  });

  it("Shouldnot fetch games on id (cannot access)", () => {
    return request(app)
      .get("/pub/games/play/2")
      .set("access_token", token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });

  it("Shouldnot fetch games on id (not found)", () => {
    return request(app)
      .get("/pub/games/play/22222")
      .set("access_token", token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });

  it("Shouldnot fetch games on id (because there is not access token)", () => {
    return request(app)
      .get("/pub/games/play/1")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });

  it("Should answer games on id (right)", () => {
    return request(app)
      .put("/pub/games/update/1")
      .set("access_token", token)
      .send({
        answer: "2",
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
  });
});
