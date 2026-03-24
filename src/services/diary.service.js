import { prisma } from "../lib/prisma.js"

export async function CreateNewDiary (data) {
    return await prisma.diary.create({data})
}

export async function GetDiary () {
    return await prisma.diary.findMany({
        orderBy: {CreatedAt: 'asc'}
    })
}

export async function GetDiaryBy (id) {
    return await prisma.diary.findUnique ({
        where: {id} //id: id
    })
}

export async function EditDiaryBy(id, updateData) {
    return await prisma.diary.update({
        where: {id}, //id: id
        data: updateData
    })
}

export async function DeleteDiaryBy (id) {
    return await prisma.diary.delete({
        where: {id}
    })
}