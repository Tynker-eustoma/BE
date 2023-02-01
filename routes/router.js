const router = require('express').Router()
const routerAdmin = require('./routerAdmin')
const routerUser = require('./routerUser')


router.use('/users', routerAdmin)
router.use('/pub', routerUser)

module.exports = router