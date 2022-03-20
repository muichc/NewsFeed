import express from 'express'
import { controllers }from '../controllers/index'
import methodOverride from 'method-override'
const categoryRouter = express.Router()

categoryRouter.use(methodOverride('_method'))

categoryRouter.get('/all', controllers.category.all)
categoryRouter.post('/save', controllers.category.save)
categoryRouter.delete('/delete', controllers.category.deleteCategories)


export { categoryRouter }