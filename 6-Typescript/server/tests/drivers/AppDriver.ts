import { ITodo } from "../../interfaces/interfaces";

export class AppDriver {
    _httpClient: any;
    _url?: string;
    _userId: string | undefined;
    constructor(httpClient: any, url: string) {
        (this._httpClient = httpClient), (this._url = url);
    }

    getTodoById(id: string) {
        const headers = this.createHeadersForCookie();
        return this._httpClient.get(`${this._url}${id}`, headers);
    }

    getAllTodos() {
        const headers = this.createHeadersForCookie();
        return this._httpClient.get(`${this._url}`, headers);
    }

    addTodo(newTodo: Partial<ITodo>) {
        const headers = this.createHeadersForCookie();
        return this._httpClient.post(`${this._url}`, newTodo, headers);
    }

    deleteTodoById(id: string) {
        const headers = this.createHeadersForCookie();
        return this._httpClient.delete(`${this._url}${id}`, headers);
    }

    updateTodoById(todo: ITodo) {
        const headers = this.createHeadersForCookie();
        return this._httpClient.put(
            `${this._url}${todo.todoId}`,
            todo,
            headers
        );
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
