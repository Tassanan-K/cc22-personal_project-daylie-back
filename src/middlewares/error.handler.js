import createHttpError from 'http-errors'
import { ZodError } from 'zod'

export function NotFoundPath (req, res, next) {
    return next (createHttpError.NotFound())
}

export function errHandler (err, req, res, next) {
    if (err instanceof ZodError ) {
        // console.log('zoderror')
        console.log(err.flatten().fieldErrors)
        res.status(400).json({
            status: 400,
            message: err.flatten().fieldErrors
        })
    }
    // console.error(err)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    })
}