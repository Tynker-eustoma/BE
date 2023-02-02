const routerUser = require("express").Router();
const ControllerUser = require("../controllers/controllerUser");

routerUser("/register", ControllerUser.register);
routerUser("/login", ControllerUser.login);

module.exports = routerUser;
