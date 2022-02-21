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
    }
})

const Todo = mongoose.model('Todo', todoScheme)

const modelGetTodoById = async (todoId, res) => {
    try {
        const todo = await Todo.findOne({'todoId': todoId}).lean(true);
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
    const todos = await Todo.find()
    return res(todos);
}

const modelPostTodo = async (newTodo, res) => {
    const todo = new Todo(newTodo)
    await todo.save()
    return res()
}

const modelDeleteTodo = async (todoId, res) => {
    try {
        await Todo.findOneAndDelete({'todoId': todoId}).lean(true);
        return res();
    } catch (err) {
        res.status(404).send({ error: "Todo is not found!" })
    }
}

const modelUpdateTodo = async (updateTodo, res) => {
    try {
        await Todo.findOneAndUpdate({todoId: updateTodo.todoId}, updateTodo)
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