import { NextFunction, Request, Response } from "express";
import { getFirestore } from 'firebase-admin/firestore'
import { NotFoundError } from "../erros/not-found.error";
import { User } from "../models/user.model";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection('users').get()
        const users = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.send({
            users
        })
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id
        const doc = await getFirestore().collection('users').doc(userId).get()

        if (!doc.exists) {
            throw new NotFoundError('Resource not found')
        }

        let user = {
            id: doc.id,
            ...doc.data()
        }

        res.send({
            user
        })
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        const user = req.body

        await getFirestore().collection('users').add(user)

        res.status(201).send({
            message: `Usuário criado com sucesso!`
        })
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id
        const user = req.body as User

        const doc = await getFirestore().collection("users").doc(userId)

        if (!(await doc.get()).exists) {
            throw new NotFoundError('Resource not found')
        }

        await doc.set({
            nome: user.name,
            email: user.email
        })

        res.send({
            message: 'Usuário editado com sucesso!'
        })
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id

        await getFirestore().collection("users").doc(userId).delete()

        res.status(204).end()
    }
}