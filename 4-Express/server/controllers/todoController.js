const TodoModel = require('../models/todoModel')


const getTodoById = (req, res) => {
    TodoModel.getTodoById(req.params.id, (todo) => {
        console.log(todo);
        res.send(todo)
    });
}
const postTodo = (req, res) => {
    TodoModel.postTodo(req, res => {

    })
}

const getAllTodos = (req, res) => {
    TodoModel.getAllTodos(req, res => {

    })
}

const deleteTodo = (req, res) => {
    TodoModel.deleteTodo(req, res => {

    })
}
const updateTodo = (req, res) => {
    TodoModel.updateTodo(req, res => {

    })
}


module.exports = {
    getTodoById,
    postTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
}