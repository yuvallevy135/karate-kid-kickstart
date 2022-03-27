import axios from "axios";
import { ITodo } from "../interfaces/interfaces";
const url = "/api/todos/";

const getTodoById = async (todoId: string) => {
    return axios
        .get(`${url}${todoId}`)
        .then((res) => {
            if (res.status != 200) {
                alert(res.data);
            } else {
                return res.data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const getAllTodos = async (): Promise<ITodo[]> => {
    return axios.get(`${url}`).then((res) => {
        if (res.status != 200) {
            alert(res.data);
        } else {
            return res.data;
        }
    });
};

const postTodo = async (todo: ITodo): Promise<void> => {
    return axios.post(`${url}`, todo).then((res) => {
        if (res.status != 201) {
            alert(res.data);
        }
    });
};

const deleteTodo = async (todoId: string) => {
    return axios
        .delete(`${url}${todoId}`)
        .then((res) => {
            if (res.status != 200) {
                alert(res.data);
            } else {
                return res.data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const updateTodo = async (todo: ITodo) => {
    return axios
        .put(`${url}${todo.todoId}`, todo)
        .then((res) => {
            if (res.status != 200) {
                alert(res.data);
            } else {
                return res.data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
export { getTodoById, getAllTodos, postTodo, deleteTodo, updateTodo };
