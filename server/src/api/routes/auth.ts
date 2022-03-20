import express from 'express'
import { controllers }from '../controllers/index'

const authRouter = express.Router()

authRouter.post('/register', controllers.auth.register)
authRouter.post('/login', controllers.auth.login)
authRouter.put('/changepw', controllers.auth.changePassword)

export { authRouter } 