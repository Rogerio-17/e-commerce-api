import express, { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../erros/not-found.error'

export const pageNotFoundHandler = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError("Not Found"))
    })
}