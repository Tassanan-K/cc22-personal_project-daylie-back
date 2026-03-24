import express from 'express'
import { DeleteMe, EditMe, Getme, Login, Register } from '../controllers/auth.controller.js'
import authenticate from '../middlewares/authenticate.middleware.js'

const authRoute = express.Router()

authRoute.post('/register', Register)

authRoute.post('/login', Login)

authRoute.get('/me', authenticate, Getme)

authRoute.patch('/me', authenticate, EditMe)

authRoute.delete('/me/:id', authenticate, DeleteMe)

export default authRoute