import express from 'express';
import { UsersController } from '../controllers/users.controller';
import expressAsyncHandler from 'express-async-handler';

export const userRoutes = express.Router();

userRoutes.get('/users', expressAsyncHandler(UsersController.getAll))

userRoutes.get('/users/:id', expressAsyncHandler(UsersController.getById))

userRoutes.post('/users', expressAsyncHandler(UsersController.save))

userRoutes.put('/users/:id', expressAsyncHandler(UsersController.update))

userRoutes.delete('/users/:id', expressAsyncHandler(UsersController.delete))

