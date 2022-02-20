import axios from 'axios'
const url = "http://localhost:5000/api/todo/"

const getTodoById = async (todoId) => {
    return axios.get(`${url}${todoId}`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const getAllTodos = async () => {
    return axios.get(`${url}/allTodos`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const postTodo = async(todo) => {
    return axios.post(`${url}`, todo)
    .catch(err => {
        console.log(err);
    })
}

const deleteTodo = async (todoId) => {
    return axios.delete(`${url}${todoId}`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const updateTodo = async (todo) => {
    return axios.put(`${url}${todo.todoId}`, todo)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}
export {
    getTodoById,
    getAllTodos,
    postTodo,
    deleteTodo,
    updateTodo
}