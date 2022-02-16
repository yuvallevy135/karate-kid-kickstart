export const todoListNameLocalStorage = "MyTodoList";

function loadTodoListFromLS() {
    const todoListArr = JSON.parse(localStorage.getItem(todoListNameLocalStorage)) || [];
    return todoListArr
}

function getTodoById(todoId){
    return loadTodoListFromLS().find(todo => todo.todoId === todoId);

}
function updateTodoInLS(myTodo){
    const todos = loadTodoListFromLS()
    const todoIndex = todos.findIndex((todo => todo.todoId === myTodo.todoId));
    todos[todoIndex] = myTodo
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}
function removeTodoFromLocalStorage(todoId){
        
    let todos = loadTodoListFromLS()
    todos = todos.filter(todo => todo.todoId != todoId)
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}
function saveTodoToLocalStorage(newTodo) {
    const todos = loadTodoListFromLS()
    todos.push(newTodo);
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}  
export {
    loadTodoListFromLS,
    updateTodoInLS,
    removeTodoFromLocalStorage,
    saveTodoToLocalStorage,
    getTodoById
}