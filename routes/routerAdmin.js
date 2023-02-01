const routerAdmin = require('express').Router()
const ControllerAdmin = require('../controllers/controllerAdmin')

routerAdmin.post('/register', ControllerAdmin.register)
routerAdmin.post('/login', ControllerAdmin.login)

module.exports = routerAdmin