const express = require('express');
const todoController = require('../controllers/todoController')
const router = express.Router();

router.get('/', todoController.getAllTodos)

router.get('/:id', todoController.getTodoById)

router.post('/', todoController.postTodo)

router.delete('/:id', todoController.deleteTodo)

router.put('/:id', todoController.updateTodo)

module.exports = router