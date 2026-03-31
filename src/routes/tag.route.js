import express from 'express'
import authenticate from '../middlewares/authenticate.middleware.js'
import { CreateNewTag, GetDiaryTags } from '../controllers/diary.controller.js'

const tagRoute = express.Router()

tagRoute.get('/', authenticate, GetDiaryTags)
tagRoute.post('/', authenticate, CreateNewTag)

export default tagRoute