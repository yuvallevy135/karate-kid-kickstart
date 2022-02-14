import {
    updateTodoInLS,
    removeTodoFromLocalStorage,
    getTodoById} from './localStorage'
import {classes} from './stylesJSS'

function handleButtonClick(type, todoId) {
    switch(type) {
        case 'delete':
            handleDeleteTodo(todoId)
            break;
        case 'edit':
            handleEditTodo(todoId)
            break;
        default:
            
    }
}   

function handleCheckedClick(todoId) {
    const todo = document.getElementById(`todo-item-${todoId}`)
    todo.classList.toggle(classes.completed)
    const myTodo = getTodoById(todoId)
    myTodo.checked = !myTodo.checked
    updateTodoInLS(myTodo)        
}

function handleDeleteTodo(todoId) {
    const li = document.getElementById(`todo-list-item-${todoId}`)
    removeTodoFromLocalStorage(todoId)
    li.remove()
}

function handleEditTodo(todoId){
    const todoItem = document.getElementById(`todo-item-${todoId}`)
    const myTodo = getTodoById(todoId)
    myTodo.todoText = todoItem.value
    updateTodoInLS(myTodo);
    todoItem.disabled = !todoItem.disabled;
}

export {
    handleButtonClick,
    handleCheckedClick
}