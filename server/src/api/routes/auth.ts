const router = require('express').Router()
const controller = require('../controllers')

router.post('/register', controller.auth.register)
router.post('/login', controller.auth.login)
router.put('/changepw', controller.auth.changePassword)

export = router