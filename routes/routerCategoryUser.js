const routerCategoryUser = require('express').Router()
const controllerUser = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')

routerCategoryUser.use(authentication) 

routerCategoryUser.get('/', controllerUser.allCategory)


module.exports = routerCategoryUser