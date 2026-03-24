import express from 'express'
import authRoute from './routes/auth.route.js'
import { errHandler, NotFoundPath } from './middlewares/error.handler.js'
import diaryRoute from './routes/diary.route.js'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoute)

app.use('/api/mydiary', diaryRoute
)

//create middleware เพื่อแสดง error กรณียิงแล้วไม่เข้า path ข้างบน ก็จะมาเข้า middleware นี้
app.use(NotFoundPath)

app.use(errHandler)

export default app