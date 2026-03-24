import {prisma} from '../lib/prisma.js'

export async function getUser (field, value) {
    return await prisma.user.findFirst({
        where: {[field]: value} 
    })
}

export async function GetUserById (id) {
    return await prisma.user.findUnique ({
        where: {id}
    })
}

export async function createUser (data) {
    return await prisma.user.create({data}) //({data: data})
}

export const editUser = async (id, updateData) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: updateData
    })
    console.log("result", result)
    return result
}

export async function DeleteUser (id) {
    await prisma.user.delete({
        where: {id}
    })
}