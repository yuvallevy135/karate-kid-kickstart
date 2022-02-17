
import {
    getTodoById,
    deleteTodo,
    updateTodo
} from './utils/TodoApi'
import {classes} from './styles/stylesJSS'

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

async function handleCheckedClick(todoId) {
    const todo = document.getElementById(`todo-item-${todoId}`)
    todo.classList.toggle(classes.completed)
    const isChecked = document.getElementById(`checked-${todoId}`).checked
    const myTodo = await getTodoById(todoId)
    myTodo.checked = isChecked
    await updateTodo(myTodo)
}
    
async function handleDeleteTodo(todoId) {
    let li = document.getElementById(`todo-list-item-${todoId}`)
    await deleteTodo(todoId)
    li.remove()
}

async function handleEditTodo(todoId){
    let todoItem = document.getElementById(`todo-item-${todoId}`)
    const myTodo = await getTodoById(todoId)
    myTodo.todoText = todoItem.value
    await updateTodo(myTodo)
    todoItem.disabled = !todoItem.disabled;
}

export {
    handleButtonClick,
    handleCheckedClick
}