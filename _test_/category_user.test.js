const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt')
const fs = require('fs')
let token
let token2
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
    token2 = signToken({ id: 2 });
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
        .get("/pub/categories")
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
        .get("/pub/category")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Shouldnot fetch category and fail response (Access token is not found)", () => {
      return request(app)
        .get("/pub/category")
        .set('access_token', "akjsdajksdh")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });

    it("Should find user", () => {
      return request(app)
        .get("/pub/find")
        .set('access_token', token)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response).toHaveProperty("body", expect.any(Object));
          expect(response.body).toHaveProperty("username", expect.any(String));
          expect(response.body).toHaveProperty("email", expect.any(String));
          expect(response.body).toHaveProperty("age", expect.any(Number));
          expect(response.body).toHaveProperty("createdAt", expect.any(String));
          expect(response.body).toHaveProperty("updatedAt", expect.any(String));
        });
    });

    it("Shouldnot find user", () => {
      return request(app)
        .get("/pub/find")
        .set('access_token', token2)
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message", expect.any(String));
        });
    });
  });

  
});
