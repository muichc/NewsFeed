const router = require('express').Router()
const controller = require('../controllers')

router.get('/', controller.news.show)

export = router