const router = require('express').Router()
const routerGameAdmin = require('./routerGameAdmin')
const routerGameUser = require('./routerGameUser')
const routerCategoryAdmin = require('./routerCategoryAdmin')
const routerCategoryUser = require('./routerCategoryUser')

router.use('/users', routerGameAdmin)
router.use('/pub', routerGameUser)
router.use('/users/categories', routerCategoryAdmin)
router.use('/pub/categories', routerCategoryUser)

module.exports = router