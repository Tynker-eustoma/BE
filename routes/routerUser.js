const routerUser = require("express").Router();
const ControllerUser = require("../controllers/controllerUser");

routerUser.post("/register", ControllerUser.register);
routerUser.post("/login", ControllerUser.login);

module.exports = routerUser;
