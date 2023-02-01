const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
});

afterAll(async () => {
})

describe("Category", () => {
    describe("GET /category", () => {
        it("Should fetch category", () => {
            return request(app)
                .get("/category")
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("games", expect.any(Array))
                })
        })

        it("Should fetch category", () => {
            return request(app)
                .get("/category")
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("games", expect.any(Array))
                })
        })

        it("Should fetch games all games based on category", () => {
            return request(app)
                .get('/category/:categoryId')
                .then(((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("imgUrl", expect.any(String))
                    expect(response.body).toHaveProperty("answer", expect.any(String))
                    expect(response.body).toHaveProperty("lvl", expect.any(String))
                    expect(response.body).toHaveProperty("categoryId", expect.any(Number))
                    expect(response.body).toHaveProperty("Category", expect.any(Object))
                    expect(response.body.Category).toHaveProperty("name", expect.any(String))
                }))
        })

        it("Should fetch games on id", () => {
            return request(app)
                .get('/games/:gamesId')
                .then(((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("imgUrl", expect.any(String))
                    expect(response.body).toHaveProperty("answer", expect.any(String))
                    expect(response.body).toHaveProperty("lvl", expect.any(String))
                    expect(response.body).toHaveProperty("question", expect.any(String))
                    expect(response.body).toHaveProperty("categoryId", expect.any(Number))
                    expect(response.body).toHaveProperty("optionA", expect.any(String))
                    expect(response.body).toHaveProperty("optionB", expect.any(String))
                    expect(response.body).toHaveProperty("optionC", expect.any(String))
                    expect(response.body).toHaveProperty("optionD", expect.any(String))
                    expect(response.body).toHaveProperty("categoryId", expect.any(Number))
                    expect(response.body).toHaveProperty("Category", expect.any(Object))
                    expect(response.body.Category).toHaveProperty("name", expect.any(String))
                }))
        })

        it("Should fetch games on id (cannot access)", () => {
            return request(app)
                .get('/games/:gamesId')
                .send({
                    answer: "Jawaban B"
                })
                .then(((response) => {
                    expect(response.status).toBe(403)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                }))
        })

        it("Should fetch games on id (not found)", () => {
            return request(app)
                .get('/games/:gamesId')
                .send({
                    answer: "Jawaban B"
                })
                .then(((response) => {
                    expect(response.status).toBe(403)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                }))
        })

        it("Should answer games on id (right)", () => {
            return request(app)
                .post('/games/:gamesId')
                .send({
                    answer: "Jawaban A"
                })
                .then(((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                }))
        })

        it("Should answer games on id (wrong)", () => {
            return request(app)
                .post('/games/:gamesId')
                .send({
                    answer: "Jawaban B"
                })
                .then(((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                }))
        })

    })
})