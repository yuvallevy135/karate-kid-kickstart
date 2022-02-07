const todoListNameLocalStorage = "My Todo List";

(function() {
    const createCheck = (todoId) => {
        let checkDiv = document.createElement('input');
        checkDiv.type = 'checkbox'
        const checkDivClassName = "checked"
        checkDiv.classList.add(checkDivClassName)
        checkDiv.addEventListener('click', function() {handleCheckedClick(todoId)})
        return checkDiv
    }
    
    const createButton = (type, todoId) => {
        let button = document.createElement('button');
        const buttonClassName = `${type}-button`
        button.classList.add(buttonClassName)
        button.appendChild(createIcon(type, todoId))
        button.addEventListener('click', function() {handleButtonClick(type, todoId)})
        return button
    } 
    const createIcon = (type, id)  => {
        let icon = document.createElement('i');
        let iconClassName = ""
        let iconId = ``
        switch(type) {
            case 'delete':
                iconClassName = "fas fa-trash";
                iconId = `icon-delete-${id}`
                break;
            case 'edit':
                iconClassName = "fas fa-edit";
                iconId = `icon-edit-${id}`
                break;
            case 'check':
                iconClassName = "fa-check";
                iconId = `icon-check-${id}`
            default:
                // none
        }
        icon.className = iconClassName;
        icon.id = iconId
        return icon
    }
    
    
    function handleButtonClick(type, todoId) {
        switch(type) {
            case 'delete':
                handleDeleteTodo(todoId)
                break;
            case 'edit':
                handleEditTodo(todoId)
                break;
            default:
                // none
        }
    }   
    
    function handleCheckedClick(todoId) {
        const todo = document.getElementById(`todo-item-${todoId}`)
        todo.classList.toggle('completed')
    }
    
    function handleSubmitTodo(e) {
        e.preventDefault();
    
        let input = document.getElementById('new-task-input');
        if (input.value.trim() != '') {
            // add the todo
            addTodo(input.value)
        }else {
            alert("You didnt enter any Todo")
        }
        // reset the input text
        input.value = '';
    }
    
    function handleDeleteTodo(todoId) {
        // loop over all
        let li = document.getElementById(`todo-list-item-${todoId}`)
        removeTodoFromLocalStorage(todoId)
        li.remove()
    }
    
    function handleEditTodo(todoId){
        let li = document.getElementById(`todo-list-item-${todoId}`)
        let todoItem = document.getElementById(`todo-item-${todoId}`)
        editTodoToLocalStorage(todoId, todoItem)
        todoItem.disabled = !todoItem.disabled
    }
    
    function createTodoItem(todo) {
        const {todoText, todoId} = todo; 
        let li = document.createElement('li')
        let todoDiv = document.createElement('input');
        todoDiv.classList.add('todo-item');
        todoDiv.disabled = true
        todoDiv.id = (`todo-item-${todoId}`)
        todoDiv.value = todoText
        const deleteButton = createButton('delete', todoId)
        const editButton = createButton('edit', todoId)
        const checked = createCheck(todoId);
    
        // add content to li
        li.appendChild(checked)
        li.appendChild(todoDiv)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.classList.add('todo-list-item')
        li.id = (`todo-list-item-${todoId}`)
        return li
    }
    
    function addTodo(todoText) {
        const todoListArr = loadTodoListFromLS()
        const todoId = todoListArr.length
        const newTodo = {"todoText": todoText, "todoId": todoId, "checked": false}
        // here we need to add a ul
        createTodoListElementTag(newTodo)
        // save new todo in local storage
        saveTodoToLocalStorage(newTodo)
    }

    function loadTodoListFromLS() {
        let todoListArr = []
        let todoListFromLocalStorage = localStorage.getItem(todoListNameLocalStorage);
        if (todoListFromLocalStorage == null) {
            todoListArr = []
        } else {
            todoListArr = JSON.parse(todoListFromLocalStorage);
        }
        return todoListArr
    }

    function saveTodoToLocalStorage(newTodo) {
        let todos = loadTodoListFromLS()
        todos.push(newTodo);
        localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
    }  

    function removeTodoFromLocalStorage(todoId){
        
        let todos = loadTodoListFromLS()
        todos = todos.filter(todo => todo.todoId != todoId)
        localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
    }

    function editTodoToLocalStorage(todoId, todoItem){
        let todos = loadTodoListFromLS()
        todos.find(todo => todo.todoId === todoId).todoText = todoItem.value
        localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
    }

    function getTodos() {
        let todoListArr = loadTodoListFromLS()
        // const todoId = todoListArr.length
        todoListArr.forEach((todo) => {
            // here we need to add a ul
            createTodoListElementTag(todo)
        });
    }

    function createTodoListElementTag(todo){
        let ul = document.getElementById('todo-list');
        let li = createTodoItem(todo)    
        ul.appendChild(li)
    }
        getTodos()
        document.getElementById('todo-button').addEventListener('click', handleSubmitTodo);
      })();

