const axios = require('axios');

// class TodoApi {
//     constructor(){
//         // this.url = url
//         this.url = "http://localhost:5000/api/todo/"
//     }
this.url = "http://localhost:5000/api/todo/"

    const getTodoById = async (todoId) => {
        try{
            const res = await axios.get(`${this.url}${todoId}`)
            console.log(res.data);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

    const getAllTodos = async() => {
        try{
            const res = await axios.get(`${this.url}/allTodos`)
            console.log(res.data);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

    const postTodo = async(todo) => {
        try{
            const res = await axios.post(`${this.url}`, todo)
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async (todoId) => {
        try{
            const res = await axios.delete(`${this.url}${todoId}`)
            console.log(res.data);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

    const updateTodo = async (todo) => {
        try{
            const res = await axios.put(`${this.url}${todo.todoId}`, todo)
            console.log(res.data);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

// }

module.exports = {
    getTodoById,
    getAllTodos,
    postTodo,
    deleteTodo,
    updateTodo
}