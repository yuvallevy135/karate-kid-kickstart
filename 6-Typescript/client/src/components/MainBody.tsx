import React, { FC, useState, useEffect } from "react";
import { ITodo } from "../interfaces/interfaces";
import "../styles/styles.css";
import { getAllTodos, postTodo } from "../utils/TodoApi";
import Form from "./Form";
import TodoList from "./TodoList";
import {
    deleteTodo as deleteTodoAPI,
    updateTodo as updateTodoAPI,
} from "../utils/TodoApi";
import ErrorModal from "./UI/ErrorModal";
import { v4 as uuidv4 } from "uuid";

interface ErrorModalObject {
    title: string;
    message: string;
}
const MainBody: FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [error, setError] = useState<ErrorModalObject | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAllTodosEffect = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const myTodos = await getAllTodos();
                setTodos(myTodos);
            } catch (e: any) {
                setError({
                    title: "Server Error",
                    message: "Something happend to the server",
                });
            }
            setIsLoading(false);
        };
        getAllTodosEffect();
    }, []);

    const deleteTodo = async (todoId: string) => {
        try {
            await deleteTodoAPI(todoId);
            setTodos(todos.filter((element) => element.todoId !== todoId));
        } catch (e: any) {
            setError({
                title: "Failed to delete todo",
                message: e.message,
            });
        }
    };

    const updateTodo = async (newTodo: ITodo) => {
        if (newTodo.todoText.trim() !== "") {
            try {
                await updateTodoAPI(newTodo);
                setTodos(
                    todos.map((element) =>
                        element.todoId === newTodo.todoId ? newTodo : element
                    )
                );
            } catch (e: any) {
                setError({
                    title: "Failed to update todo",
                    message: e.message,
                });
            }
        } else {
            setError({
                title: "Missing Todo Name",
                message: "Todo must have a name",
            });
        }
    };
    const onAddTodo = async () => {
        if (inputText.trim() !== "") {
            const newTodo: ITodo = {
                todoText: inputText,
                todoId: uuidv4(),
                checked: false,
            };
            try {
                await postTodo(newTodo);
                setTodos((prevTodos) => {
                    return [...prevTodos, newTodo];
                });
                setInputText("");
            } catch (e: any) {
                setError({
                    title: "Failed to add todo",
                    message: e.message,
                });
            }
        } else {
            setError({
                title: "Forgot input",
                message: "You didnt enter any Todo",
            });
        }
    };

    const onClickErrorHandler = () => {
        setError(null);
    };
    const updateTodoTextHandler = (newTodo: ITodo) => {
        setTodos(
            todos.map((element) =>
                element.todoId === newTodo.todoId ? newTodo : element
            )
        );
    };
    const getContent = () => {
        let content = <p>Fonud no Todos.</p>;
        if (todos.length > 0) {
            content = (
                <TodoList
                    todos={todos}
                    onDelete={deleteTodo}
                    updateTodo={updateTodo}
                    updateTodoTextHandler={updateTodoTextHandler}
                />
            );
        }
        if (error) {
            content = (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onClickErrorHandler={onClickErrorHandler}
                />
            );
        }
        if (isLoading) {
            content = <p>Loading....</p>;
        }
        return content;
    };
    const content = getContent();
    return (
        <div className="main">
            <div className="my-todo-list-wrap-container">
                <Form
                    inputText={inputText}
                    setInputText={setInputText}
                    onAddTodo={onAddTodo}
                ></Form>
                {content}
            </div>
        </div>
    );
};

export default MainBody;
