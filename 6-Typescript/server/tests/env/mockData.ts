import { ITodo } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import chance from "chance";
type Guid = string;
type UserId = Guid;
export const createTodo = (defParams: Partial<ITodo> = {}): ITodo => {
    return {
        todoText: defParams.todoText || `test${chance().integer()}`,
        todoId: defParams.todoId || createTodoId(),
        checked: defParams.checked || false,
        userId: defParams?.userId || createUserId(),
    };
};
export const createTodoWithMissingChecked = () => {
    return {
        todoText: `test${chance().integer()}`,
        todoId: createTodoId(),
        userId: createUserId(),
    };
};

export const generatePort = (): number => {
    return Math.ceil(Math.random() * 10000 + 1000);
};
export const createTodoId = (): string => uuidv4();
export const createUserId = (): UserId => uuidv4();
