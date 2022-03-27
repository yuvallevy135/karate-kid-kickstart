import React, { FC } from "react";
import { ITodo } from "../interfaces/interfaces";
import Todo from "./Todo/Todo";
import "../styles/styles.css";

interface TodoListProps {
    todos: ITodo[];
    updateTodo: (newTodo: ITodo) => void;
    onDelete: (todoId: string) => void;
    updateTodoTextHandler: (newTodo: ITodo) => void;
}

const TodoList: FC<TodoListProps> = ({
    todos,
    onDelete,
    updateTodo,
    updateTodoTextHandler,
}) => {
    return (
        <div className="todo-list-container">
            {
                <ul className="todo-list" id="todo-list">
                    {todos.map((todo: ITodo) => (
                        <Todo
                            key={todo.todoId}
                            newTodo={todo}
                            onDelete={onDelete}
                            updateTodo={updateTodo}
                            updateTodoTextHandler={updateTodoTextHandler}
                        />
                    ))}
                </ul>
            }
        </div>
    );
};

export default TodoList;
