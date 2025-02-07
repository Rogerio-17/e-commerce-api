import { getFirestore } from "firebase-admin/firestore"
import { User } from "../models/user.model"
import { NotFoundError } from "../erros/not-found.error"

export class UserService {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection('users').get()
        const users = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[]

        return users
    }

    async getById(userId: string): Promise<User> {
        const doc = await getFirestore().collection('users').doc(userId).get()

        if (!doc.exists) {
            throw new NotFoundError('Resource not found')
        }

        let user = {
            id: doc.id,
            ...doc.data()
        } as User

        return user
    }

    async save(user: User): Promise<void> {
        await getFirestore().collection('users').add(user)
    }

    async update(user: User, userId: string): Promise<void> {
        const doc = await getFirestore().collection("users").doc(userId)

        if (!(await doc.get()).exists) {
            throw new NotFoundError('Resource not found')
        }

        await doc.set({
            nome: user.name,
            email: user.email
        })
    }

    async delete(userId: string): Promise<void> {
        await getFirestore().collection("users").doc(userId).delete()
    }
}