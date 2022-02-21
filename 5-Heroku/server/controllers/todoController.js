const {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo} = require('../models/todoModel')


const getTodoById = (req, res) => {
    modelGetTodoById(req.params.id, (todo) => {
        res.status(200).json(todo)
    });
}
const postTodo = (req, res) => {
    modelPostTodo(req.body, () => {
        res.sendStatus(201);
    })
}

const getAllTodos = (req, res) => {
    modelGetAllTodos(req, (todos) => {
        res.status(200).json(todos)
    })
}

const deleteTodo = (req, res) => {
    modelDeleteTodo(req.params.id, () => {
        res.sendStatus(200)
    });
}
const updateTodo = (req, res) => {
    modelUpdateTodo(req.body, () => {
        res.sendStatus(200)
    })
}


module.exports = {
    getTodoById,
    postTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
}