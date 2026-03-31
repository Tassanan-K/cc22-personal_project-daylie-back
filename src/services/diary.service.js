import { prisma } from "../lib/prisma.js"

export async function CreateNewDiary(data) {
    console.log('dataaaa', data)
    // console.log('iconidddd', iconId)
    return await prisma.diary.create({data})
}

// export async function CreateDiaryImage(diaryId, ImgData) {
//     // console.log('image', ImgData)
//     // console.log('id', id)
//     return await prisma.image.create({
//         data: {
//             diaryId,
//             url: ImgData.image,
//             description: ImgData.description
//         }
//     })
// }

export async function CreateTag(tagData) {
    // console.log('tag', diaryTag)
    return await prisma.tag.create({
        data: {
            name: tagData.tagName
        }
    })
}

export async function AddDiaryTag(diaryId, idTag) {
    console.log('tagggggg',idTag)
    return await prisma.diaryTag.create({
        data: {
            diaryId,
            tagId: Number(idTag.tagId)
        }
    })
}

export async function GetTags() {
    return await prisma.tag.findMany()
}


export async function GetMyDiary(id) {
    return await prisma.diary.findMany({
        where: {userId: id},
        orderBy: { CreatedAt: 'desc' }
    })
}

export async function GetDiaryBy(id) {
    console.log(id)
    return await prisma.diary.findUnique({
        where: { id: id } //id: id
    })
}

export async function EditDiaryBy(id, updateData) {
    return await prisma.diary.update({
        where: { id }, //id: id
        data: updateData
    })
}

export async function DeleteDiaryBy(id) {
    return await prisma.diary.delete({
        where: { id }
    })
}