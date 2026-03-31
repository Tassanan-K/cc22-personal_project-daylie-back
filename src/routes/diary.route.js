import express from 'express'
import { CreateDiary, GetDiaryById, EditDiary, DeleteDiary, GetAllMyDiary} from '../controllers/diary.controller.js'
import authenticate from '../middlewares/authenticate.middleware.js'

const diaryRoute = express.Router()

diaryRoute.post('/', authenticate, CreateDiary)

diaryRoute.get('/', authenticate, GetAllMyDiary)

diaryRoute.get('/:id', authenticate, GetDiaryById)

diaryRoute.patch('/:id', authenticate, EditDiary)

diaryRoute.delete('/:id', authenticate, DeleteDiary)

export default diaryRoute