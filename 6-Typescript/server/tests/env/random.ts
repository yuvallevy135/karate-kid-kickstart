import { ITodo } from './../../interfaces/ITodo';
import {v4 as uuidv4} from 'uuid'
import chance from 'chance'

export const createTodo = (): ITodo => {
    return {
    "todoText": `test${chance().integer()}`,
    "todoId": createTodoId(),
    "checked": false,
    "userId": createTodoId()
    }
}
export const createTodoWithMissingChecked = () => {
    return {
    "todoText": `test${chance().integer()}`,
    "todoId": createTodoId(),
    "userId": createTodoId()
    }
}
export const createTodoId = ():string => uuidv4()
export const createUserId = ():string => uuidv4()
