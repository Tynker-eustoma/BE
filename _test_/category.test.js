const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const {signToken} = require('../helpers/jwt')
const fs = require('fs')
let token
beforeAll(async () => {
  try {
    token = signToken({
      id: 1,
      role: "user",
    });
    const newData = JSON.parse(fs.readFileSync('./_test_/data/category.json', 'utf-8')).map(x => {
      x.createdAt = x.updatedAt = new Date()
      return x
    })
    const categories = await sequelize.queryInterface.bulkInsert('Categories', newData, {})
  } catch (error) {
    console.log(error);
  }
});

afterAll (async () => {
  await sequelize.queryInterface.bulkDelete("Categories", null, {truncate: true, cascade: true, restartIdentity: true})
})

describe.skip("Category", () => {
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
  });
});
