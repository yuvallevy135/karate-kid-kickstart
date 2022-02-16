const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')


router.get('/allTodos', todoController.getAllTodos)

router.get('/:id', todoController.getTodoById)

router.post('/', todoController.postTodo)

router.delete('/:id', todoController.deleteTodo)

router.put('/:id', todoController.updateTodo)

module.exports = router