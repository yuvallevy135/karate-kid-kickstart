export interface ITodo {
    todoText: string;
    todoId: string;
    checked: boolean;
    userId: string;
}
export interface IDataBaseConnection {
    connect: () => Promise<void>;
    disconnect: () => void;
}

export interface ITodoService {
    modelGetTodoById: (userId: string, todoId: string) => Promise<ITodo | null>;
    modelGetAllTodos: (userId: string) => Promise<ITodo[] | null>;
    modelPostTodo: (newTodo: ITodo) => Promise<ITodo | null>;
    modelDeleteTodo: (todoId: string, userId: string) => Promise<ITodo | null>;
    modelUpdateTodo: (updateTodo: ITodo) => Promise<ITodo | null>;
}
