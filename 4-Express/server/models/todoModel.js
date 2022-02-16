let todos = []

const TodoModel = () => {
}

TodoModel.getTodoById = async (todoId, res) => {
    const todo = todos.find(todo => todo.todoId === todoId);
    console.log('getTodoById ', todo);
    return res(todo);
}

TodoModel.getAllTodos = async (req, res) => {
    console.log('current todos list ', todos);
    return res(todos);
}

TodoModel.postTodo = async (newTodo, res) => {
    todos.push(newTodo)
    console.log('added todo ', newTodo);

    console.log('current todos list ', todos);

    return res(todos)
}

TodoModel.deleteTodo = async (todoId, res) => {
    todos = todos.filter(todo => todo.todoId != todoId)
    console.log('deleted todo ', todoId);
    console.log('current todos list ', todos);
    return res(todos)
}

TodoModel.updateTodo = async (updateTodo, res) => {
    const todoIndex = todos.findIndex((todo => todo.todoId === updateTodo.todoId));
    todos[todoIndex] = updateTodo
    console.log('updaete todo ', updateTodo.todoId);
    console.log('current todos list ', todos);
    return res(todos);
}

module.exports = TodoModel