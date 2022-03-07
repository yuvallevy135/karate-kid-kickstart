import { ITodo } from './../interfaces/ITodo';
import {Request, Response} from 'express'
import { ITodoService } from '../interfaces/ITodoService';
export class TodoController {
    db: ITodoService
    constructor(db: ITodoService) {
        this.db = db

    }
    getTodoById = async (req: Request, res: Response): Promise<void> => {
        const userId: string = req.body.userId;
        const todoId: string= req.params.id
        
        const todo: ITodo | null = await this.db.modelGetTodoById(userId, todoId);
        if(todo) {
            res.status(200).json(todo)
        } else {                                                
            res.sendStatus(404)
        }
    }
    postTodo = async (req: Request, res: Response): Promise<void> => {   
        try {
            const {userId, todoText, todoId, checked}:
            { userId:string, todoText:string, todoId:string, checked:boolean }
             = req.body
            const newTodo: ITodo = {
                todoText: todoText,
                todoId: todoId,
                checked: checked,
                userId: userId,
            }
            const todo: ITodo | null = await this.db.modelPostTodo(newTodo);
            if(!todo) {
                res.status(400).send('Failed to post todo');
            } else {
                res.sendStatus(201);
            }
        } catch(err) {
            res.status(400).send(err);
        }
    }
    
    getAllTodos = async (req: Request, res: Response): Promise<void> => {   
        const userId: string = req.body.userId;        
        const todos: ITodo[] | null = await this.db.modelGetAllTodos(userId);
        res.status(200).json(todos)
    }
    
    deleteTodo = async (req: Request, res: Response): Promise<void> => {
        const todoId: string = req.params.id
        const userId: string = req.body.userId;
        const todo: ITodo | null = await this.db.modelDeleteTodo(todoId, userId)
        if (!todo){
            res.sendStatus(404)
        } else {
            res.sendStatus(200)
        }    
    }
    updateTodo = async (req: Request, res: Response): Promise<void> => {        
        const {userId, todoText, todoId, checked}:
        { userId:string, todoText:string, todoId:string, checked:boolean }
         = req.body
        const newTodo: ITodo = {
            todoText: todoText,
            todoId: todoId,
            checked: checked,
            userId: userId,
        }
        const updateTodo: ITodo = newTodo
        const todo: ITodo | null = await this.db.modelUpdateTodo(updateTodo)        
        if (!todo){
            res.sendStatus(404)
        } else {
            res.sendStatus(200)
        }
    }

}
