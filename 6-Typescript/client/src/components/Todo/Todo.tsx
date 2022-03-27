import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import CustomeButton from "../CustomeButton/CustomeButton";
import { classes } from "../../styles/stylesJSS";
import { ITodo } from "../../interfaces/interfaces";
import "../../styles/styles.css";
import dataHooks from "./dataHooks";

interface TodoProps {
    newTodo: ITodo;
    updateTodo: (newTodo: ITodo) => void;
    onDelete: (todoId: string) => void;
    updateTodoTextHandler: (newTodo: ITodo) => void;
}

export const Todo: FC<TodoProps> = ({
    newTodo,
    updateTodo,
    onDelete,
    updateTodoTextHandler,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const deleteTodo = async () => {
        onDelete(newTodo.todoId);
    };

    const editTodoHandler = async () => {
        if (editMode) {
            await updateTodo(newTodo);
            updateTodoTextHandler(newTodo);
        }
        setEditMode((prevEditMode) => !prevEditMode);
    };
    const todoInputTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        newTodo.todoText = e.currentTarget.value;
        updateTodoTextHandler(newTodo);
    };

    const completeHandler = async () => {
        const update = { ...newTodo, checked: !newTodo.checked };
        await updateTodo(update);
        updateTodo(update);
    };
    const todoTextElement = !editMode ? (
        <label
            className={`${classes.todoItemText} ${
                newTodo.checked ? classes.completed : ""
            }`}
            data-hook={dataHooks.inputText}
        >
            {newTodo.todoText}
        </label>
    ) : (
        <input
            className={`${classes.todoItemInput} ${
                newTodo.checked ? classes.completed : ""
            }`}
            type="text"
            value={newTodo.todoText}
            onChange={todoInputTextHandler}
            data-hook={dataHooks.inputText}
        />
    );

    return (
        <div>
            <li className={classes.todoListItem}>
                <input
                    className={`checked ${classes.checked}`}
                    type="checkbox"
                    checked={newTodo.checked}
                    onClick={completeHandler}
                    data-hook={dataHooks.checkedInput}
                ></input>
                {todoTextElement}
                <CustomeButton
                    className={"delete-button button-style"}
                    icon={"fas fa-trash"}
                    buttonType={"button"}
                    onClickHandler={deleteTodo}
                    dataHook={dataHooks.deleteButton}
                ></CustomeButton>
                <CustomeButton
                    className={"edit-button button-style"}
                    icon={editMode ? "fas fa-plus" : "fas fa-edit "}
                    buttonType={"button"}
                    onClickHandler={editTodoHandler}
                    dataHook={dataHooks.editButton}
                ></CustomeButton>
            </li>
        </div>
    );
};

export default Todo;
