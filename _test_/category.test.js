const request = require("supertest");
const app = require("../app");

beforeAll(async () => {});

afterAll(async () => {});

describe("Category", () => {
  describe("GET /category", () => {
    it("Should fetch category", () => {
      return request(app)
        .get("/category")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("games", expect.any(Array));
        });
    });
  });
});
