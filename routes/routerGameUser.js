const routerUser = require("express").Router();
const ControllerUser = require("../controllers/controllerUser");
const authentication = require('../middlewares/authentication')

routerUser.post("/register", ControllerUser.register);
routerUser.post("/login", ControllerUser.login);

routerUser.use(authentication)

routerUser.get('/games/:categoryId', ControllerUser.getGameById)

module.exports = routerUser;
