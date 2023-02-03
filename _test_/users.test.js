const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
});

afterAll(async () => {
})

describe.skip("Users", () => {
    describe("POST /registers", () => {
        it("Should create customer", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "diky2123",
                    email: "123@gmail.com",
                    password: "22222",
                    age: 7,
                })
                .then((response) => {
                    expect(response.status).toBe(201)
                    expect(response.body).toHaveProperty("id", expect.any(Number))
                    expect(response.body).toHaveProperty("username", expect.any(String))
                    expect(response.body).toHaveProperty("email", expect.any(String))
                    expect(response.body).toHaveProperty("password", expect.any(String))
                    expect(response.body).toHaveProperty("age", expect.any(Number))
                    expect(response.body).toHaveProperty("lvlCount", expect.any(Number))
                    expect(response.body).toHaveProperty("lvlGuess", expect.any(Number))
                    expect(response.body).toHaveProperty("lvlLearn", expect.any(Number))
                    expect(response.body).toHaveProperty("createdAt", expect.any(String))
                    expect(response.body).toHaveProperty("updatedAt", expect.any(String))
                })
            })

        it("Shouldnot create customer because email is empty", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "diky2123",
                    password: "22222",
                    age: 7,
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because password is empty", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "diky2123",
                    email: "123@gmail.com",
                    age: 7,
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because email is empty", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "diky2123",
                    email: "",
                    password: "22222",
                    age: 7,
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because password is empty", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "diky2123",
                    email: "123@gmail.com",
                    password: "",
                    age: 7,
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Should create customer email is alreadery registered", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "dikyyyyyyyyy",
                    email: "22@gmail.com",
                    password: "22222",
                    age: 7
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Should create customer because invalid email", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "dikyyyyyyyyyyyy",
                    email: "21111",
                    password: "22222",
                    age: 7
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })
        
        it("Should create customer because age is empty", () => {
            return request(app)
                .post("/register")
                .send({
                    username: "dikyyyyyyyyyyyy",
                    email: "21111",
                    password: "22222",
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })
    })

    describe("POST /login", () => {
        it("Should login (customer)", () => {
            return request(app)
                .post("/login")
                .send({
                    email: "22@gmail.com",
                    password: "22222",
                })
                .then((response) => {
                    expect(response.status).toBe(201)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                    expect(response.body).toHaveProperty("access_token", expect.any(String))
                    expect(response.body).toHaveProperty("role", expect.any(String))
                })
            })

            it("Shouldnot login (customer)", () => {
                return request(app)
                    .post("/login")
                    .send({
                        email: "2@gmail.com",
                        password: "222222",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
                })

            it("Shouldnot login (customer) because email havent registered", () => {
                return request(app)
                    .post("/login")
                    .send({
                        email: "222@gmail.com",
                        password: "22222",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })

            it("Shouldnot login (customer) because password is invalid", () => {
                return request(app)
                    .post("/login")
                    .send({
                        email: "222@gmail.com",
                        password: "22222",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })
        })
            

})