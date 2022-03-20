const router = require('express').Router()
const controller = require('../controllers')

router.get('/', controller.news.show)
router.get('/byCategory', controller.news.showByCategory)
router.post('/byUser', controller.news.showByUser)

export = router