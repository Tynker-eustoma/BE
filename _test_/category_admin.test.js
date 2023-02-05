const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt')
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
    token = signToken({ id: 1 });
    const newData = JSON.parse(fs.readFileSync('./_test_/data/category.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })
    await sequelize.queryInterface.bulkInsert('Categories', newData, {})
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Categories", null, { truncate: true, cascade: true, restartIdentity: true })
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
})

describe("Category", () => {
  describe("GET /category", () => {
    it("Should fetch category", () => {
      return request(app)
        .get("/users/categories")
        .set('access_token', token)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response).toHaveProperty("body", expect.any(Array));
          expect(response.body[0]).toHaveProperty("name", expect.any(String));
          expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
          expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
        });
    });

    it("Shouldnot fetch category and fail response (Access token is not found)", () => {
      return request(app)
        .get("/users/category")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });
  });

  describe("/post categories", () => {
    it("create a new categories", () => {
      return request(app)
        .post("/users/categories")
        .set("access_token", token)
        .send({
          name: "drawing",
        })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });
  })

  describe("/delete categories", () => {
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
