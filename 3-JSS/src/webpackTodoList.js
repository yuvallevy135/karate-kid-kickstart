import {
    loadTodoListFromLS,
    saveTodoToLocalStorage,
    } from './localStorage'
import {
    handleButtonClick,
    handleCheckedClick
} from './elementsHandlers'
import {classes} from './stylesJSS'
import {v4 as uuidv4} from 'uuid'
(function() {
    const createCheck = (todo) => {
        const checkDiv = document.createElement('input');
        checkDiv.type = 'checkbox'
        const checkDivClassName = "checked"
        checkDiv.checked = todo.checked
        checkDiv.id = 'checked'
        checkDiv.className = classes.checked
        checkDiv.classList.add(checkDivClassName)
        checkDiv.addEventListener('click', function() {handleCheckedClick(todo.todoId)})
        return checkDiv
    }

    const createButton = (type, todoId) => {
        const button = document.createElement('button');
        const buttonClassName = `${type}-button`
        button.classList.add(buttonClassName)
        button.appendChild(createIcon(type, todoId))
        button.addEventListener('click', function() {handleButtonClick(type, todoId)})
        return button
    } 
    const createIcon = (type, id)  => {
        const icon = document.createElement('i');
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
        }
        icon.className = iconClassName;
        icon.id = iconId
        return icon
    }

    function handleSubmitTodo(e) {
        e.preventDefault();
        const input = document.getElementById('new-task-input');
        if (input.value.trim() != '') { 
            addTodo(input.value)
        }else {
            alert("You didnt enter any Todo")
        }
        input.value = '';
    }

    function createTodoItem(todo) {
        const {todoText, todoId} = todo; 
        const li = document.createElement('li')
        const todoDiv = document.createElement('input');
        todoDiv.className = classes.todoItem
        todoDiv.classList.add('todo-item');
        todo.checked ? todoDiv.classList.toggle(classes.completed) : ''
        todoDiv.disabled = todo.checked ? true : false
        todoDiv.id = (`todo-item-${todoId}`)
        todoDiv.value = todoText
        const deleteButton = createButton('delete', todoId)
        const editButton = createButton('edit', todoId)
        const checked = createCheck(todo);

        li.appendChild(checked)
        li.appendChild(todoDiv)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.className = classes.todoListItem
        // li.classList.add('todo-list-item')
        li.id = (`todo-list-item-${todoId}`)
        return li
    }

    function addTodo(todoText) {
        const todoId = uuidv4()
        const newTodo = {"todoText": todoText, "todoId": todoId, "checked": false}
        createTodoListElementTag(newTodo)
        saveTodoToLocalStorage(newTodo)
    }

    function loadTodosToBrowser() {
        const todoListArr = loadTodoListFromLS()
        todoListArr.forEach((todo) => {
            createTodoListElementTag(todo)
        });
    }

    function createTodoListElementTag(todo){
        const ul = document.getElementById('todo-list');
        const li = createTodoItem(todo);
        ul.appendChild(li)
    }
    loadTodosToBrowser()
    document.getElementById('todo-button').addEventListener('click', handleSubmitTodo);
})();

