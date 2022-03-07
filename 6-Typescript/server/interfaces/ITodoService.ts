import { ITodo } from "./ITodo";

export interface ITodoService {
    modelGetTodoById: (userId: string, todoId: string) => Promise<ITodo | null>;
    modelGetAllTodos: (userId: string) => Promise<ITodo[] | null>
    modelPostTodo: (newTodo: ITodo) => Promise<ITodo | null>
    modelDeleteTodo: (todoId: string, userId: string) => Promise<ITodo | null>
    modelUpdateTodo: (updateTodo: ITodo) => Promise<ITodo | null>
}