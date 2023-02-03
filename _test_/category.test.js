const request = require("supertest");
const app = require("../app");
const { Category, sequelize } = require("../models");

beforeAll(async () => {});

afterAll(async () => {});

describe.skip("Category", () => {
  describe("GET /category", () => {
    it("Should fetch category", () => {
      return request(app)
        .get("/category")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("games", expect.any(Array));
        });
    });

    it("Should fetch category and fail response", () => {
      return request(app)
        .get("/category")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("games", expect.any(Array));
        });
    });
  });
});
