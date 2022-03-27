import React from "react";
import { Todo } from "./Todo";
import { BaseDriver } from "../../test/baseDriver";
import { ITodo } from "../../interfaces/interfaces";
import { createTodo } from "../../../../server/tests/env/mockData";
import { render, fireEvent } from "@testing-library/react";
import dataHooks from "./dataHooks";

export class TodoDriver extends BaseDriver {
    private todo: ITodo = createTodo();
    private updateTodo: jest.Mock = jest.fn();
    private onDeleteMock: jest.Mock = jest.fn();
    private updateTodoTextHandler: jest.Mock = jest.fn();

    private getElementUsingDataHook(hook: string) {
        if (!this.wrapper) {
            throw new Error("Must render component first!");
        }
        return this.wrapper?.getByTestId(hook);
    }
    private inputText = () => {
        return this.getElementUsingDataHook(dataHooks.inputText);
    };
    private labelText = () => {
        return this.getElementUsingDataHook(dataHooks.labelText);
    };
    private checkedInput = () => {
        return this.getElementUsingDataHook(dataHooks.checkedInput);
    };

    private editButton = (buttonDataHook: string) => {
        return this.getElementUsingDataHook(buttonDataHook);
    };
    private buttonClick = (buttonDataHook: string) => {
        const buttonRes = this.getElementUsingDataHook(buttonDataHook);
        fireEvent.click(buttonRes);
    };

    given = {
        item: (item: Partial<ITodo>) => {
            this.todo = { ...this.todo, ...item };
        },
    };

    when = {
        render: () => {
            this.wrapper = render(
                <Todo
                    newTodo={this.todo}
                    updateTodo={this.updateTodo}
                    onDelete={this.onDeleteMock}
                    updateTodoTextHandler={this.updateTodoTextHandler}
                />
            );
        },
        editButtonClick: () => {
            return this.buttonClick(dataHooks.editButton);
        },
        deleteButtonClick: () => {
            return this.buttonClick(dataHooks.deleteButton);
        },
    };

    get = {
        inputText: () => (this.inputText() as HTMLInputElement).value,
        labelText: () => this.labelText().textContent,
        checkedInput: () => (this.checkedInput() as HTMLInputElement).checked,
        editButton: () => this.editButton(dataHooks.editButton),
        deleteButton: () => this.onDeleteMock,
    };
}
