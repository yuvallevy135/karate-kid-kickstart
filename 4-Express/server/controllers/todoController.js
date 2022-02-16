const TodoModel = require('../models/todoModel')


const getTodoById = (req, res) => {
    TodoModel.getTodoById(req.params.id, (todo) => {
        res.status(200).json(todo)
    });
}
const postTodo = (req, res) => {
    TodoModel.postTodo(req.body, (todos) => {
        res.status(201).send(todos);
    })
}

const getAllTodos = (req, res) => {
    TodoModel.getAllTodos(req, (todos) => {
        console.log(todos);
        res.status(200).json(todos)
    })
}

const deleteTodo = (req, res) => {
    TodoModel.deleteTodo(req.params.id, (todos) => {
        res.status(200).json(todos)
    });
}
const updateTodo = (req, res) => {
    TodoModel.updateTodo(req.body, (todo) => {
        res.status(200).json(todo)
    })
}


module.exports = {
    getTodoById,
    postTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
}