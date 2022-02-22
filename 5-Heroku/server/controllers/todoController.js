const {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo} = require('../models/todoModel');
const {v4: uuidv4} =  require('uuid');

const getTodoById = (req, res) => {
    modelGetTodoById(req, (todo) => {
        res.status(200).json(todo)
    });
}
const postTodo = (req, res) => {
    modelPostTodo(req, () => {
        res.sendStatus(201);
    })
}

const getAllTodos = (req, res) => {
    const cookieId = req.cookies['user_id'];
    if (!cookieId) {
        const cookieId = uuidv4();
        res.cookie('user_id', cookieId, {httpOnly: true, secure: false });
    }
    modelGetAllTodos(req, (todos) => {
        res.status(200).json(todos)
    })
}

const deleteTodo = (req, res) => {
    modelDeleteTodo(req, () => {
        res.sendStatus(200)
    });
}
const updateTodo = (req, res) => {
    modelUpdateTodo(req, () => {
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