const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");

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
      role: "user",
    });
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
});

describe.skip("api user", () => {
  describe("POST /pub/register", () => {
    test("should create new user and response 201", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers3",
          email: "customers3@gmail.com",
          password: hashPassword("password"),
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty("newUser", expect.any(Object));
          expect(response.body.newUser).toHaveProperty(
            "id",
            expect.any(Number)
          );
          expect(response.body.newUser).toHaveProperty(
            "username",
            expect.any(String)
          );
        });
    });

    test("create users without input email and response 400", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers3",
          password: hashPassword("password"),
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message", "Email is required");
        });
    });

    test("create users without input password and response 400", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers4",
          email: "customers4@gmail.com",
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "Password is required"
          );
        });
    });

    test("create users with email: `` and response 400", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers3",
          email: "",
          password: hashPassword("password"),
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message", "Email is required");
        });
    });


    test("create users with input email already exists and response 400", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers1",
          email: "customers1@gmail.com",
          password: hashPassword("password"),
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "Email already used, please use another email"
          );
        });
    });

    test("create users with wrong format email and response 400", () => {
      return request(app)
        .post("/pub/register")
        .send({
          username: "customers4",
          email: "customers4",
          password: hashPassword("password"),
          age: 5,
          lvlCount: 1,
          lvlGuess: 1,
          lvlLearn: 1,
          role: "user",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "please input the correct email"
          );
        });
    });
  }),


    describe("POST /pub/login", () => {
      test("success login and response 200", () => {
        return request(app)
          .post("/pub/login")
          .send({
            email: "customers1@gmail.com",
            password: "password",
          })
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
              "access_token",
              expect.any(String)
            );
          });
      });

      test("failed login with wrong password and response 401", () => {
        return request(app)
          .post("/pub/login")
          .send({
            email: "customers1@gmail.com",
            password: "pass",
          })
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty(
              "message",
              "Invalid Email/Password"
            );
          });
      });

      test("failed login with wrong email and response 401", () => {
        return request(app)
          .post("/pub/login")
          .send({
            email: "customers11111111@gmail.com",
            password: "password",
          })
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty(
              "message",
              "Invalid Email/Password"
            );
          });
      });
    });
});
