const router = require('express').Router()
const controller = require('../controllers')
// const methodOverride=require('method-override');

// router.use(methodOverride('_method'))

router.get('/all', controller.category.all)
router.post('/save', controller.category.save)
router.delete('/delete', controller.category.deleteCategories)


export = router