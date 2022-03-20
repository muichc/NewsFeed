import express from 'express'
import { controllers }from '../controllers/index'

const newsRouter = express.Router()

newsRouter.get('/', controllers.news.show)
newsRouter.get('/byCategory', controllers.news.showByCategory)
newsRouter.post('/byUser', controllers.news.showByUser)

export { newsRouter }