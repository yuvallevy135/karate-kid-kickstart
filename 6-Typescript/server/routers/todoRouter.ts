import express from 'express'
import {TodoController} from '../controllers/todoController'
import { TodoDAOMongo } from '../models/TodoDAOMongo';
const router = express.Router();

export const todoRouter = (db: TodoDAOMongo) => {
  const todoController = new TodoController(db);
  
  router.get("/", todoController.getAllTodos);

  router.get("/:id", todoController.getTodoById);

  router.post("/", todoController.postTodo);

  router.delete("/:id", todoController.deleteTodo);

  router.put("/:id", todoController.updateTodo);

  return router
};
