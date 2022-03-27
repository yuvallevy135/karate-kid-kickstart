import { createTodo } from "../../../../server/tests/env/mockData";
import { TodoDriver } from "./Todo.driver";

describe("Create Todo", () => {
    let driver: TodoDriver;

    beforeEach(() => {
        driver = new TodoDriver();
    });

    test("should display label Todo text", () => {
        const todo = createTodo();

        driver.given.item(todo);
        driver.when.render();

        expect(driver.get.labelText()).toEqual(todo.todoText);
    });

    test("should display input todo test after clicking on edit button", () => {
        const todo = createTodo();
        driver.given.item(todo);

        driver.when.render();
        driver.when.editButtonClick();

        expect(driver.get.inputText()).toEqual(todo.todoText);
    });

    test("should click on delete button and call onDelete once", () => {
        const todo = createTodo();
        driver.given.item(todo);

        driver.when.render();
        driver.when.deleteButtonClick();

        expect(driver.get.deleteButton()).toHaveBeenCalled();
    });

    test("should display input checked/ not chceked", () => {
        const todo = createTodo();
        driver.given.item(todo);

        driver.when.render();
        const res = driver.get.checkedInput();
        console.log(res);

        expect(driver.get.checkedInput()).toEqual(todo.checked);
    });
});
