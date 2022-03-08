import { ITodo } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import chance from "chance";

export const createTodo = (defParams: Partial<ITodo> = {}): ITodo => {
    return {
        todoText: defParams.todoText || `test${chance().integer()}`,
        todoId: defParams.todoId || createTodoId(),
        checked: defParams.checked || false,
        userId: defParams.userId || createTodoId(),
    };
};
export const createTodoWithMissingChecked = () => {
    return {
        todoText: `test${chance().integer()}`,
        todoId: createTodoId(),
        userId: createTodoId(),
    };
};
export const createTodoId = (): string => uuidv4();
export const createUserId = (): string => uuidv4();
