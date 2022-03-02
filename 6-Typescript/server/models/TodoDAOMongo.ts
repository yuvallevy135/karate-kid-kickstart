import {Schema, model, Model, connect} from 'mongoose'
import {ITodo} from '../interfaces/ITodo'
import {ITodoService} from '../interfaces/ITodoService'
import dotenv from 'dotenv'
dotenv.config()

const todoScheme: Schema = new Schema<ITodo>({
    todoText: {
        type: String,
        required: true
    },
    todoId: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

export class TodoDAOMongo implements ITodoService {
    Todo: Model<ITodo> = model('Todo', todoScheme)
    
    modelGetTodoById = async (userId: string, todoId: string): Promise<ITodo> => {
        try {
            const todo: ITodo = await this.Todo.where({userId: userId}).findOne({'todoId': todoId}).lean(true);
            const resTodo = {
                todoId: todo.todoId,
                todoText: todo.todoText,
                checked: todo.checked,
                userId: userId
            }
            return resTodo;
        } catch (err: any) {
            throw new Error(err)
        }
    }
    
    modelGetAllTodos = async (userId: string): Promise<ITodo[]>  => {
        try{
            const todos: ITodo[] = await this.Todo.where({userId: userId}).find()     
            return todos;
        } catch (err: any) {
            throw new Error(err)
        }
    }
    
    modelPostTodo = async (newTodo: ITodo): Promise<void> => {
        const todo = new this.Todo(newTodo)
        await todo.save()
        return
    }
    
    modelDeleteTodo = async (todoId: string, userId: string): Promise<void> => {
        try {
            await this.Todo.where({userId: userId}).findOneAndDelete({'todoId': todoId}).lean(true);
            return;
        } catch (err: any) {
            throw new Error(err)
        }
    }
    
    modelUpdateTodo = async (userId: string, updateTodo: any): Promise<void> => {
        try {
            await this.Todo.where({userId: userId}).findOneAndUpdate({todoId: updateTodo.todoId}, updateTodo)
            return ;
        } catch (err: any) {
            throw new Error(err)
        }
    }
    
    connectDB = async (): Promise<void> => {
        try {
            const con = await connect(process.env.MONGO_URL || '')
            console.log('Connected to MongoDB');
            return
        } catch (err: any) {
            throw new Error(err)
        }
    }
}