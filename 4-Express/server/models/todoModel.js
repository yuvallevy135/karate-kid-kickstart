let todos = []


const modelGetTodoById = async (todoId, res) => {
    const todo = todos.find(todo => todo.todoId === todoId);
    return res(todo);
}

const modelGetAllTodos = async (req, res) => {
    return res(todos);
}

const modelPostTodo = async (newTodo, res) => {
    todos.push(newTodo)
    return res()
}

const modelDeleteTodo = async (todoId, res) => {
    todos = todos.filter(todo => todo.todoId != todoId)
    return res()
}

const modelUpdateTodo = async (updateTodo, res) => {
    const todoIndex = todos.findIndex((todo => todo.todoId === updateTodo.todoId));
    todos[todoIndex] = updateTodo
    return res();
}

module.exports = {
    modelGetTodoById,
    modelGetAllTodos,
    modelPostTodo,
    modelDeleteTodo,
    modelUpdateTodo
}