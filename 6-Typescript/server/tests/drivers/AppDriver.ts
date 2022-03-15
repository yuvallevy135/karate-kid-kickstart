import axios from "axios";
import { ITodo } from "../../interfaces/interfaces";

export class AppDriver {
    _url?: string;
    _userId: string | undefined;
    constructor(url: string) {
        this._url = url;
    }

    getTodoById(id: string) {
        const headers = this.createHeadersForCookie();
        return axios.get(`${this._url}${id}`, headers);
    }

    getAllTodos() {
        const headers = this.createHeadersForCookie();
        return axios.get(`${this._url}`, headers);
    }

    addTodo(newTodo: Partial<ITodo>) {
        const headers = this.createHeadersForCookie();
        return axios.post(`${this._url}`, newTodo, headers);
    }

    deleteTodoById(id: string) {
        const headers = this.createHeadersForCookie();
        return axios.delete(`${this._url}${id}`, headers);
    }

    updateTodoById(todo: ITodo) {
        const headers = this.createHeadersForCookie();
        return axios.put(`${this._url}${todo.todoId}`, todo, headers);
    }
    checkUserId(): boolean {
        return this._userId != undefined ? true : false;
    }
    setUserId(userId: string | undefined): void {
        this._userId = userId;
    }

    resetUserId(): void {
        this._userId = undefined;
    }
    createHeadersForCookie(): object {
        let headers: object = {};
        if (this.checkUserId()) {
            return {
                headers: {
                    Cookie: `userId=${this._userId}`,
                },
            };
        }
        return headers;
    }
}
