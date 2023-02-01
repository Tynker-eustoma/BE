const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const user = require("../models/user");

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "customers1",
      email: "customers1@gmail.com",
      password: hashPassword("password"),
      phoneNumber: "08123456789",
      address: "Jl.jl",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    token = encodeToken({
      id: user.id,
      role: "customer",
    });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async() => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
})

describe("api customer", () => {
  describe("POST /admin/register", () => {
    test("should create new customer and response 201", () => {
      return request(app)
        .post("/customers/register")
        .send({
          username: "customers3",
          email: "customers3@gmail.com",
          password: hashPassword("password"),
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty("showUser", expect.any(Object));
          expect(response.body.showUser).toHaveProperty(
            "id",
            expect.any(Number)
          );
          expect(response.body.showUser).toHaveProperty(
            "email",
            expect.any(String)
          );
        });
    });

    test("create customers without input email and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers3",
          password: hashPassword("password"),
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message", "Email is required");
        });
    });

    test("create customers without input password and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers4",
          email: "customers4@gmail.com",
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "Password is required"
          );
        });
    });

    test("create customers with email: `` and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers3",
          email: "",
          password: hashPassword("password"),
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message", "Email is required");
        });
    });

    test("create customers with input password: `` and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers4",
          email: "customers4@gmail.com",
          password: "",
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "Password length minimum is 5!"
          );
        });
    });

    test("create customers with input email already exists and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers1",
          email: "customers1@gmail.com",
          password: hashPassword("password"),
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "message",
            "email must be unique"
          );
        });
    });

    test("create customers with wrong format email and response 400", () => {
      return request(app)
        .post("/admin/register")
        .send({
          username: "customers4",
          email: "customers4",
          password: hashPassword("password"),
          phoneNumber: "08123456789",
          address: "Jl.jl",
          role: "customer",
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
    describe("POST /customers/login", () => {
      test("success login and response 200", () => {
        return request(app)
          .post("/admin/login")
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
            expect(response.body).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("role", expect.any(String));
          });
      });

      test("failed login with wrong password and response 401", () => {
        return request(app)
          .post("/admin/login")
          .send({
            email: "customers1@gmail.com",
            password: "pass",
          })
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty(
              "message",
              "Incorrect email or password"
            );
          });
      });

      test("failed login with wrong email and response 401", () => {
        return request(app)
          .post("/admin/login")
          .send({
            email: "customers11111111@gmail.com",
            password: "password",
          })
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty(
              "message",
              "Incorrect email or password"
            );
          });
      });
    });
});
