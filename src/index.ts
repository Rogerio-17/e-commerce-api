import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';

initializeApp()
const app = express();

routes(app)
errorHandler(app)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})