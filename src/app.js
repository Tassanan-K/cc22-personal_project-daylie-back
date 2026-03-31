import express from 'express'
import authRoute from './routes/auth.route.js'
import { errHandler, NotFoundPath } from './middlewares/error.handler.js'
import diaryRoute from './routes/diary.route.js'
import cors from 'cors'
import tagRoute from './routes/tag.route.js'

const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoute)

app.use('/api/mydiary', diaryRoute)

app.use('/api/tag', tagRoute)

//create middleware เพื่อแสดง error กรณียิงแล้วไม่เข้า path ข้างบน ก็จะมาเข้า middleware นี้
app.use(NotFoundPath)

app.use(errHandler)

export default app