const {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo} = require('../models/todoDAO');

const getTodoById = async (req, res) => {
    const userId = req.user_id;
    const todoId = req.params.id
    const todo = await modelGetTodoById(userId, todoId);
    res.status(200).json(todo)
}
const postTodo = async (req, res) => {
    const userId = req.user_id;
    modelPostTodo(req.body, userId);
    res.sendStatus(201);

}

const getAllTodos = async (req, res) => {
    const userId = req.user_id;
    const todos = await modelGetAllTodos(userId);
    res.status(200).json(todos)
}

const deleteTodo = async (req, res) => {
    const todoId = req.params.id
    const userId = req.user_id;
    await modelDeleteTodo(todoId, userId)
    res.sendStatus(200)

}
const updateTodo = async (req, res) => {
    const userId = req.user_id;
    const updateTodo = req.body
    await modelUpdateTodo(userId, updateTodo)
    res.sendStatus(200)

}


module.exports = {
    getTodoById,
    postTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
}