import createHttpError from "http-errors"
import { createUser, DeleteUser, editUser, getUser, GetUserById } from "../services/user.service.js"
import { editUserSchema, loginSchema, registerSchema } from "../validations/schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from "../lib/prisma.js"

export async function Register(req, res, next) {
    //validation
    const data = await registerSchema.parseAsync(req.body)
    console.log(data)

    // const key = Object.keys(data)
    // const field = key[0] //ได้ key: username มา

    //หา user ว่าเคย register ไปแล้วหรือยัง
    const foundUser = await getUser('username', data.username)

    if (foundUser) {
        return next(createHttpError[409]('This user already register'))
    }

    const createdUser = await createUser(data)

    const userData = {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email
    }

    res.json({
        message: "Register successful",
        user: userData
    })
}

export async function Login(req, res) {
    //validation login
    const data = await loginSchema.parseAsync(req.body)
    console.log(data)

    // const key = Object.keys(data)
    // const field = key[0] //ได้ key: username มา

    //หาว่าเคยมี user นี้แล้วหรือยัง
    const foundUser = await getUser('username', data.username)
    console.log(foundUser)

    if(!foundUser) {
        return next (createHttpError[401]('Invalid login 1'))
    }

    let correctedPassword = await bcrypt.compare(data.password, foundUser.password)

    if(!correctedPassword) {
        return next(createHttpError[401]('Invalid login 2'))
    }
    
    //create token
    const payload = {id: foundUser.id}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '30d'
    })

    const {password, createdAt, updatedAt, ...userData} = foundUser //ตัด password, createdAt, updatedAt ออก แล้วส่งของไปแค่ username, email

    res.json({
        message: "Login successful",
        token: token,
        body: userData
    })
}


export function Getme(req, res) {
    res.json({
        user: req.user
    })
}


export async function DeleteMe (req, res, next) {
    const id = Number(req.params.id)

    const foundUser = await GetUserById(id)
    
    if(!foundUser) {
        return next (createHttpError[404]('Data not found'))
    }

    if(req.user.id !== foundUser.id) {
        return next (createHttpError[401]('Cannot delete this account'))
    }

    const result = await DeleteUser(id)

    res.json({
        message: 'Deleted User'
    })
}


export async function EditMe (req, res, next) {
    const userId = req.user.id
    const updateData = req.body
    // console.log(updateData)
    try {
        editUserSchema.parse(updateData)

        if (updateData.password) {
        const hashPassword = await bcrypt.hash(updateData.password, 10)
        // console.log(hashPassword)
        updateData.password = hashPassword
    }
    // console.log('updatedata', updateData)
    await editUser(userId, updateData)
    res.status(200).json({message: "Profile updated"})
    } catch (error) {
        next(error)
    }
}