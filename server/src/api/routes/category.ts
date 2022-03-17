const router = require('express').Router()
const controller = require('../controllers')

router.get('/all', controller.category.all)
router.post('/save', controller.category.save)


export = router