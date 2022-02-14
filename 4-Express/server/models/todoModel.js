const TodoModel = () => {
    this.todos = []
}

TodoModel.getTodoById = async (id, res) => {
    const todoId = id;
    return res({"todoId": todoId})
}

TodoModel.getAllTodos = async (req, res) => {
    
}

TodoModel.postTodo = async (req, res) => {
    
}

TodoModel.deleteTodo = async ([todoId], res) => {
    
}
TodoModel.updateTodo = async ([todoId], res) => {
    
}

module.exports = TodoModel