const routerCategoryAdmin = require('express').Router()
const ControllerAdmin = require('../controllers/controllerAdmin')
const authentication = require('../middlewares/authentication')

routerCategoryAdmin.use(authentication)

routerCategoryAdmin.post('/', ControllerAdmin.createCategory)
routerCategoryAdmin.get('/', ControllerAdmin.allCategory)
routerCategoryAdmin.delete('/:id', ControllerAdmin.deleteCategory)
routerCategoryAdmin.put('/:id', ControllerAdmin.updateCategory)


module.exports = routerCategoryAdmin