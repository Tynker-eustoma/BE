const routerGameAdmin = require('express').Router()
const ControllerAdmin = require('../controllers/controllerAdmin')
const authentication = require('../middlewares/authentication')


routerGameAdmin.post('/register', ControllerAdmin.register)
routerGameAdmin.post('/login', ControllerAdmin.login)

routerGameAdmin.use(authentication)

routerGameAdmin.post('/categories', ControllerAdmin.createCategory)
routerGameAdmin.get('/categories', ControllerAdmin.allCategory)
routerGameAdmin.delete('/categories/:id', ControllerAdmin.deleteCategory)
routerGameAdmin.put('/categories/:id', ControllerAdmin.updateCategory)

routerGameAdmin.post('/games', ControllerAdmin.createGame)
routerGameAdmin.get('/games', ControllerAdmin.allGames)
routerGameAdmin.delete('/games/:id', ControllerAdmin.deleteGame)
routerGameAdmin.put('/games/:id', ControllerAdmin.updateGame)


module.exports = routerGameAdmin