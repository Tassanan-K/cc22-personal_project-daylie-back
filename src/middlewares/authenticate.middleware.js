import createHttpError from "http-errors"
import jwt from 'jsonwebtoken'
import { getUser } from "../services/user.service.js"

export default async function authenticate(req, res, next) {
    const authorization = req.headers.authorization
    // console.log(authorization)

    if (!authorization || !authorization.startsWith('Bearer')) {
        return next (createHttpError[401]('Unauthorized 1'))
    }

    const token = authorization.split(' ')[1]

    if (!token) {
        throw (createHttpError[401]('Unauthorized 2'))
    }

    //verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET) //ตรวจสอบและถอดรหัส Token คืนค่า payload ที่ฝังไปตอนแรกมาให้

    //เอา payload.id ไปหา user
    const foundUser = await getUser ('id', payload.id)
    if(!foundUser) {
        throw (createHttpError[401]('Unauthorized 3'))
    }

    const {password, createdAt, updatedAt, ...userData} = foundUser
    req.user = userData
    // console.log('req.user', req.user)

    next()
}