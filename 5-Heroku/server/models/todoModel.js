const mongoose = require('mongoose')
const todoScheme = new mongoose.Schema({
    todoText: {
        type: String,
        required: true
    },
    todoId: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoScheme)

const modelGetTodoById = async (req, res) => {
    try {
        const userId = req.cookies['user_id'];
        const todoId = req.params.id
        const todo = await Todo.where({userId: userId}).findOne({'todoId': todoId}).lean(true);
        const resTodo = {
            todoId: todo.todoId,
            todoText: todo.todoText,
            checked: todo.checked
        }
        return res(resTodo);
    } catch (err) {
        res.status(404).send({ error: "Todo is not found!" })
    }
}

const modelGetAllTodos = async (req, res) => {
    try{
        const userId = req.cookies['user_id'];
        const todos = await Todo.where({userId: userId}).find()
        return res(todos);
    } catch (err) {
        console.log(err);
    }
}

const modelPostTodo = async (req, res) => {
    const userId = req.cookies['user_id'];
    req.body.userId = userId
    const todo = new Todo(req.body)
    await todo.save()
    return res()
}

const modelDeleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const userId = req.cookies['user_id'];
        await Todo.where({userId: userId}).findOneAndDelete({'todoId': todoId}).lean(true);
        return res();
    } catch (err) {
        res.status(404).send({ error: "Todo is not found!" })
    }
}

const modelUpdateTodo = async (req, res) => {
    try {
        const userId = req.cookies['user_id'];
        const updateTodo = req.body
        await Todo.where({userId: userId}).findOneAndUpdate({todoId: updateTodo.todoId}, updateTodo)
        return res();
    } catch (err) {
        res.status(404).send({ error: "Todo is not found!" })
    }
}

module.exports = {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo
}