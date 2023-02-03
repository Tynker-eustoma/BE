const routerUser = require("express").Router();
const ControllerUser = require("../controllers/controllerUser");
const authentication = require('../middlewares/authentication')

routerUser.post("/register", ControllerUser.register);
routerUser.post("/login", ControllerUser.login);

routerUser.use(authentication)

routerUser.get('/games/:categoryId', ControllerUser.getCategoryById)
routerUser.get('/games/play/:id', ControllerUser.getGameByLevelAndCategory)
routerUser.put('/games/update/:categoryId', ControllerUser.updateLevel)

module.exports = routerUser;
