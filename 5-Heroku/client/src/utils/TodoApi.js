import axios from 'axios'
const url = '/todos/'

const getTodoById = async (todoId) => {
    return axios.get(`${url}${todoId}`)
    .then(res => {
        if (res.status != 200) {
            alert(res.err)
        } else {
            return res.data
        }
    })
    .catch(err => {
        console.log(err);
    })
}

const getAllTodos = async () => {
    return axios.get(`${url}`)
    .then(res => {
        if (res.status != 200) {
            alert(res.err)
        } else {
            return res.data
        }
    })
    .catch(err => {
        console.log(err);
    })
}

const postTodo = async(todo) => {
    return axios.post(`${url}`, todo)
    .then(res => {
        if (res.status != 201) {
            alert(res.err)
        }
    })
    .catch(err => {
        console.log(err);
    })
}

const deleteTodo = async (todoId) => {
    return axios.delete(`${url}${todoId}`)
    .then(res => {
        if (res.status != 200) {
            alert(res.err)
        } else {
            return res.data
        }
    })
    .catch(err => {
        console.log(err);
    })
}

const updateTodo = async (todo) => {
    return axios.put(`${url}${todo.todoId}`, todo)
    .then(res => {
        if (res.status != 200) {
            alert(res.err)
        } else {
            return res.data
        }
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