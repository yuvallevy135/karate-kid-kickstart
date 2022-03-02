import { ITodo } from './../interfaces/ITodo';
import {Request, Response} from 'express'
import { TodoDAOMongo } from '../models/TodoDAOMongo';
export class TodoController {
    db: TodoDAOMongo
    constructor(db: TodoDAOMongo) {
        this.db = db

    }
    getTodoById = async (req: Request, res: Response): Promise<void> => {
        const userId: string = req.body.userId;
        const todoId: string= req.params.id
        const todo: ITodo = await this.db.modelGetTodoById(userId, todoId);
        res.status(200).json(todo)
    }
    postTodo = async (req: Request, res: Response): Promise<void> => {
        const {userId, todoText, todoId, checked}:
        {userId:string, todoText:string, todoId:string, checked:boolean }
         = req.body
        const newTodo: ITodo = {
            todoText: todoText,
            todoId: todoId,
            checked: checked,
            userId: userId,
        }
        await this.db.modelPostTodo(newTodo);
        res.sendStatus(201);
    }
    
    getAllTodos = async (req: Request, res: Response): Promise<void> => {   
        const userId: string = req.body.userId;
        const todos: ITodo[] = await this.db.modelGetAllTodos(userId);
        res.status(200).json(todos)
    }
    
    deleteTodo = async (req: Request, res: Response): Promise<void> => {
        const todoId: string = req.params.id
        const userId: string = req.body.userId;
        await this.db.modelDeleteTodo(todoId, userId)
        res.sendStatus(200)
    
    }
    updateTodo = async (req: Request, res: Response): Promise<void> => {
        const userId: string = req.body.userId;
        const updateTodo: string = req.body
        await this.db.modelUpdateTodo(userId, updateTodo)
        res.sendStatus(200)
    }

}


// export const todoController = ({ db }: {db: any}) : any => {
    
//     return {
//         updateTodo,
//         deleteTodo,
//         getAllTodos,
//         getTodoById,
//         postTodo
//     }
// }
