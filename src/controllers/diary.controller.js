import createHttpError from "http-errors"
import { prisma } from "../lib/prisma.js"
import { CreateNewDiary, DeleteDiaryBy, EditDiaryBy, GetDiary, GetDiaryBy } from "../services/diary.service.js"

export async function CreateDiary (req, res, next) {
    const {title, content} = req.body
    
    const data = {title, content, userId: req.user.id}

    const result = await CreateNewDiary(data)

    res.status(201).json({
        message: "New Diary Created successful",
        result
    })
}


export async function GetAllDiary (req, res, next) {
    const result = await GetDiary()
    res.json({diaries: result})
}


export async function GetDiaryById (req, res, next) {
    const id = Number(req.params.id)
    // console.log(id)

    const foundDiary = await GetDiaryBy(id)

    if(!foundDiary) {
        return next (createHttpError[404]('Not found diary'))
    }

    if(req.user.id !== foundDiary.userId) {
        return next (createHttpError[401]('Not found your diary'))
    }

    res.json({diary: foundDiary})
}


export async function EditDiary (req, res, next) {
    const id = Number(req.params.id)
    const updateDiary = req.body

    const foundDiary = await GetDiaryBy(id)

    if(!foundDiary) {
        return next (createHttpError[404]('Not found diary'))
    }

    if(req.user.id !== foundDiary.userId) {
        return next (createHttpError[401]('Not found your diary'))
    }

    const result = await EditDiaryBy(id, updateDiary)

    res.json({
        message: 'Diary Updated',
        diary: result
    })
}


export async function DeleteDiary (req, res, next) {
    const id = Number(req.params.id)

    const foundDiary = await GetDiaryBy(id)

    if(!foundDiary) {
        return next (createHttpError[404]('Not found diary'))
    }

    if(req.user.id !== foundDiary.userId) {
        return next (createHttpError[401]('Not found your diary'))
    }

    const result = await DeleteDiaryBy(id)

    res.json({
        message: 'Diary Deleted'
    })
}