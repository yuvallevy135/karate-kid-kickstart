import { Schema, Model, model } from "mongoose";
import { ITodo } from "../interfaces/interfaces";
import { ITodoService } from "../interfaces/interfaces";
const todoScheme: Schema = new Schema<ITodo>({
    todoText: {
        type: String,
        required: true,
    },
    todoId: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});
export class TodoDAODataAPI implements ITodoService {
    Todo: Model<ITodo>;
    constructor() {
        this.Todo = model("Todo", todoScheme);
    }
    modelGetTodoById = async (
        userId: string,
        todoId: string
    ): Promise<ITodo | null> => {
        return await this.Todo.where({ userId: userId })
            .findOne(
                { todoId: todoId },
                { todoText: 1, todoId: 1, checked: 1, userId: 1, _id: 0 }
            )
            .lean(true);
    };

    modelGetAllTodos = async (userId: string): Promise<ITodo[] | null> => {
        return await this.Todo.find(
            { userId: userId },
            { todoText: 1, todoId: 1, checked: 1, userId: 1, _id: 0 }
        );
    };

    modelPostTodo = async (newTodo: ITodo): Promise<ITodo | null> => {
        const todo = new this.Todo(newTodo);
        return await todo.save();
    };

    modelDeleteTodo = async (
        todoId: string,
        userId: string
    ): Promise<ITodo | null> => {
        return await this.Todo.where({ userId: userId })
            .findOneAndDelete({ todoId: todoId })
            .lean(true);
    };

    modelUpdateTodo = async (updateTodo: any): Promise<ITodo | null> => {
        return await this.Todo.where({
            userId: updateTodo.userId,
        }).findOneAndUpdate({ todoId: updateTodo.todoId }, updateTodo);
    };
}
