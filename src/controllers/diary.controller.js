import createHttpError from "http-errors"
import { AddDiaryTag, CreateNewDiary, CreateTag, DeleteDiaryBy, EditDiaryBy, GetDiaryBy, GetMyDiary, GetTags } from "../services/diary.service.js"

export async function CreateDiary(req, res, next) {
    const { date, title, content, tagId, icon, image, img_description } = req.body
    console.log(req.body)

    const data = { date, title, icon, content, image, img_description, userId: req.user.id }
    // console.log('data',data)
    const idTag = { tagId }
    console.log(idTag)
    // const diaryTag = { tagname }

    // console.log('id', diaryId)

    const result = await CreateNewDiary(data)
    // console.log('result',result)
    const diaryId = result.id
    console.log(result)
    // console.log('diaryId',diaryId)

    // const imgAdd = await CreateDiaryImage(diaryId, ImgData)

    // console.log('imgAdd', imgAdd)

    // const tagAdd = await CreateNewTag(diaryTag)
    // // console.log('imgAdd', imgAdd)
    // const tagId = tagAdd.id

    const Diary_tag = await AddDiaryTag(diaryId, idTag)
    console.log(Diary_tag)

    // try {

    // } catch (error) {
    //     console.log('createDiaryerror', error)
    // }

    res.status(201).json({
        message: "New Diary Created successful",
        result,
        Diary_tag

    })
}


export async function GetAllMyDiary(req, res, next) {
    const { id } = req.user
    console.log('userid', id)
    const result = await GetMyDiary(id)
    // console.log('getmydiary', result)
    res.json({ diaries: result })
}


export async function GetDiaryById(req, res, next) {
    const id = Number(req.params.id)
    // console.log(id)

    const foundDiary = await GetDiaryBy(id)

    if (!foundDiary) {
        return next(createHttpError[404]('Not found diary'))
    }

    if (req.user.id !== foundDiary.userId) {
        return next(createHttpError[401]('Not found your diary'))
    }

    res.json({ diary: foundDiary })
}


export async function EditDiary(req, res, next) {
    const id = Number(req.params.id)
    const updateDiary = req.body

    const foundDiary = await GetDiaryBy(id)

    if (!foundDiary) {
        return next(createHttpError[404]('Not found diary'))
    }

    if (req.user.id !== foundDiary.userId) {
        return next(createHttpError[401]('Not found your diary'))
    }

    const result = await EditDiaryBy(id, updateDiary)

    res.json({
        message: 'Diary Updated',
        diary: result
    })
}


export async function DeleteDiary(req, res, next) {
    const id = Number(req.params.id)

    const foundDiary = await GetDiaryBy(id)

    if (!foundDiary) {
        return next(createHttpError[404]('Not found diary'))
    }

    if (req.user.id !== foundDiary.userId) {
        return next(createHttpError[401]('Not found your diary'))
    }

    const result = await DeleteDiaryBy(id)

    res.json({
        message: 'Diary Deleted'
    })
}

export async function GetDiaryTags(req, res, next) {
    const result = await GetTags()
    res.json({ tags: result })
}


export async function CreateNewTag(req, res, next) {
    const { tagName } = req.body
    const tagData = { tagName }
    const result = await CreateTag(tagData)
    res.json({ newTag: result })
}

