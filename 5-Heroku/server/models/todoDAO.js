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

const modelGetTodoById = async (userId, todoId) => {
    try {
        const todo = await Todo.where({userId: userId}).findOne({'todoId': todoId}).lean(true);
        const resTodo = {
            todoId: todo.todoId,
            todoText: todo.todoText,
            checked: todo.checked
        }
        return resTodo;
    } catch (err) {
        return { error: "Todo is not found!" }
    }
}

const modelGetAllTodos = async (userId) => {
    try{
        const todos = await Todo.where({userId: userId}).find()
        return todos;
    } catch (err) {
        console.log(err);
    }
}

const modelPostTodo = async (newTodo, userId) => {
    newTodo.userId = userId
    const todo = new Todo(newTodo)
    await todo.save()
    return
}

const modelDeleteTodo = async (todoId, userId) => {
    try {
        await Todo.where({userId: userId}).findOneAndDelete({'todoId': todoId}).lean(true);
        return;
    } catch (err) {
        return { error: "Todo is not found!" }
    }
}

const modelUpdateTodo = async (userId, updateTodo) => {
    try {
        await Todo.where({userId: userId}).findOneAndUpdate({todoId: updateTodo.todoId}, updateTodo)
        return ;
    } catch (err) {
        return { error: "Todo is not found!" }
    }
}

module.exports = {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo
}