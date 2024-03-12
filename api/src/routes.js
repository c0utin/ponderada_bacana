import express from "express";
import { BookController } from './controllers/BookController.js';

const routes = express.Router();

routes.get('/books', BookController.findAll);
routes.get('/books/:id', BookController.findByPk);
routes.post('/books', BookController.create);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

export default routes;
