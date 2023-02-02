const routerAdmin = require('express').Router()
const ControllerAdmin = require('../controllers/controllerAdmin')
const authenticationAdmin = require('../middlewares/authenticationAdmin')

routerAdmin.post('/register', ControllerAdmin.register)
routerAdmin.post('/login', ControllerAdmin.login)


routerAdmin.use(authenticationAdmin)


routerAdmin.post('/categories', ControllerAdmin.createCategory)
routerAdmin.get('/categories', ControllerAdmin.allCategory)
routerAdmin.delete('/categories/:id', ControllerAdmin.deleteCategory)
routerAdmin.put('/categories/:id', ControllerAdmin.updateCategory)

routerAdmin.post('/games', ControllerAdmin.createGame)
routerAdmin.get('/games', ControllerAdmin.allGames)
routerAdmin.delete('/games/:id', ControllerAdmin.deleteGame)
routerAdmin.put('/games/:id', ControllerAdmin.updateGame)


module.exports = routerAdmin