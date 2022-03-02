import { ITodo } from "./ITodo";

export interface ITodoService {
    modelGetTodoById: (userId: string, todoId: string) => Promise<ITodo>;
    modelGetAllTodos: (userId: string) => Promise<ITodo[]>
    modelPostTodo: (newTodo: ITodo) => Promise<void>
    modelDeleteTodo: (todoId: string, userId: string) => Promise<void>
    modelUpdateTodo: (userId: string, updateTodo: any) => Promise<void>
}