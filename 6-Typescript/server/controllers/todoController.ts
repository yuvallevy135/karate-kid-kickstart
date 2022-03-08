import { ITodo } from "../interfaces/interfaces";
import { Request, Response } from "express";
import { ITodoService } from "../interfaces/interfaces";
export class TodoController {
    private db: ITodoService;
    constructor(db: ITodoService) {
        this.db = db;
    }
    getTodoById = async (req: Request, res: Response): Promise<void> => {
        const userId: string = req.body.userId;
        const todoId: string = req.params.id;

        const todo: ITodo | null = await this.db.modelGetTodoById(
            userId,
            todoId
        );
        if (todo == null) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(todo);
    };
    postTodo = async (req: Request, res: Response): Promise<void> => {
        const newTodo = req.body;
        try {
            const todo: ITodo | null = await this.db.modelPostTodo(newTodo);
            res.sendStatus(201);
        } catch (err: any) {
            if (err.name == "ValidationError") {
                res.status(400).send(err.message);
                return;
            }
            res.sendStatus(500);
            return;
        }
    };

    getAllTodos = async (req: Request, res: Response): Promise<void> => {
        const userId: string = req.body.userId;
        const todos: ITodo[] | null = await this.db.modelGetAllTodos(userId);
        res.status(200).json(todos);
    };

    deleteTodo = async (req: Request, res: Response): Promise<void> => {
        const todoId: string = req.params.id;
        const userId: string = req.body.userId;
        const todo: ITodo | null = await this.db.modelDeleteTodo(
            todoId,
            userId
        );
        if (todo == null) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(200);
    };
    updateTodo = async (req: Request, res: Response): Promise<void> => {
        const updateTodo = req.body as ITodo;
        const todo: ITodo | null = await this.db.modelUpdateTodo(updateTodo);
        if (todo == null) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(200);
    };
}
