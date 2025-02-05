import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../erros/validation.error'
import { InternalServerError } from '../erros/internal-server.error'
import { NotFoundError } from '../erros/not-found.error'

export const errorHandler = (app: express.Express) => {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationError) {
            error.send(res)
            return
        }

        if(error instanceof NotFoundError) {
            error.send(res)
            return
        }

        new InternalServerError().send(res)
    })
}