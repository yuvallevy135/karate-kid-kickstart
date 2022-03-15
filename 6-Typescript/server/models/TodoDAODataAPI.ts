import mongoose, { Schema, Model, model } from "mongoose";
import { ITodo } from "../interfaces/interfaces";
import { ITodoService } from "../interfaces/interfaces";
import { ValidationError } from "./MongoErrors";
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

enum MONGO_INCLUDE_ATTRIBUTE {
    Yes = 1,
    No = 0,
}
export class TodoDAODataAPI implements ITodoService {
    Todo: Model<ITodo>;
    constructor() {
        this.Todo = model("Todo", todoScheme);
    }
    modelGetTodoById = async (
        userId: string,
        todoId: string
    ): Promise<ITodo | null> => {
        return await this.Todo.where({ userId })
            .findOne(
                { todoId: todoId },
                {
                    todoText: MONGO_INCLUDE_ATTRIBUTE.Yes,
                    todoId: MONGO_INCLUDE_ATTRIBUTE.Yes,
                    checked: MONGO_INCLUDE_ATTRIBUTE.Yes,
                    userId: MONGO_INCLUDE_ATTRIBUTE.Yes,
                    _id: MONGO_INCLUDE_ATTRIBUTE.No,
                }
            )
            .lean(true);
    };

    modelGetAllTodos = async (userId: string): Promise<ITodo[] | null> => {
        return await this.Todo.find(
            { userId },
            { todoText: 1, todoId: 1, checked: 1, userId: 1, _id: 0 }
        );
    };

    modelPostTodo = async (newTodo: ITodo): Promise<ITodo | null | Error> => {
        try {
            const todo = new this.Todo(newTodo);
            return await todo.save();
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw new ValidationError(err.message);
            }

            throw new Error();
        }
    };

    modelDeleteTodo = async (
        todoId: string,
        userId: string
    ): Promise<ITodo | null> => {
        return await this.Todo.where({ userId })
            .findOneAndDelete({ todoId })
            .lean(true);
    };

    modelUpdateTodo = async (updateTodo: ITodo): Promise<ITodo | null> => {
        return await this.Todo.where({
            userId: updateTodo.userId,
        }).findOneAndUpdate({ todoId: updateTodo.todoId }, updateTodo);
    };
}
