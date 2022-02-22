import axios from 'axios'
const url = "http://localhost:5000/api/todo/"

const getTodoById = async (todoId) => {
    return axios.get(`${url}${todoId}`, {withCredentials: true})
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const getAllTodos = async (userId) => {
    return axios.get(`${url}/allTodos`,{withCredentials: true})
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const postTodo = async(todo) => {
    return axios.post(`${url}`, todo, {withCredentials: true})
    .catch(err => {
        console.log(err);
    })
}

const deleteTodo = async (todoId) => {
    return axios.delete(`${url}${todoId}`, {withCredentials: true})
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

const updateTodo = async (todo) => {
    return axios.put(`${url}${todo.todoId}`, todo, {withCredentials: true})
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