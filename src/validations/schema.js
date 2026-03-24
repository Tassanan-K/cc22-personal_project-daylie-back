import {z} from 'zod'
import bcrypt from 'bcrypt'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

export const registerSchema = z.object({
    username: z.string().min(5, "Must have more than 5 characters"),
    email: z.email ().refine(value => emailRegex.test(value), "Email is required"),
    password: z.string().min(6, "Password must more than 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required")
}).refine(data => data.password === data.confirmPassword, {
    //refine นอก object เพราะต้องการอ้างถึง password & confirmPassword
    message: 'confirmPassword must match password',
    path: ['confirmPassword'] //ระบุว่าผิดที่ confirmpassword ที่ไม่ตรงกับ password ที่ใส่
}).transform(async data => ({
    username: data.username,
    email: data.email,
    password: await bcrypt.hash(data.password, 10)
}))

export const loginSchema = z.object({
    username: z.string().min(5, "Must have more than 5 characters"),
    password: z.string().min(6, "Password must more than 6 characters")
}).transform(async data => ({
    username: data.username,
    password: data.password
}))

export const editUserSchema = z.object({
    username: z.string().min(5, "Must have more than 5 characters").optional(),
    email: z.email().refine(value => emailRegex.test(value), "Email is required").optional(),
    password: z.string().min(6, "Password must more than 6 characters").optional()
})