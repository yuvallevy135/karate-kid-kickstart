/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/webpackTodoList.js ***!
  \********************************/
const todoListNameLocalStorage = "My Todo List";

(function() {
    const createCheck = (todo) => {
        let checkDiv = document.createElement('input');
        checkDiv.type = 'checkbox'
        const checkDivClassName = "checked"
        checkDiv.checked = todo.checked
        checkDiv.classList.add(checkDivClassName)
        checkDiv.addEventListener('click', function() {handleCheckedClick(todo.todoId)})
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
        let todos = loadTodoListFromLS()
        const myTodo = todos.find(todo => todo.todoId === todoId)
        todos.find(todo => todo.todoId === todoId).checked = !myTodo.checked;
        localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
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
        todo.checked ? todoDiv.classList.toggle('completed') : ''
        const deleteButton = createButton('delete', todoId)
        const editButton = createButton('edit', todoId)
        const checked = createCheck(todo);
    
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yZjM0MTU3Y2M4YmIwMjI4ZTljNS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGdDQUFnQztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEtBQUs7QUFDeEM7QUFDQTtBQUNBLHFEQUFxRCxnQ0FBZ0M7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLEdBQUc7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEdBQUc7QUFDekM7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEdBQUc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxPQUFPO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsT0FBTztBQUNsRSw0REFBNEQsT0FBTztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yLXdlYnBhY2svLi9zcmMvd2VicGFja1RvZG9MaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRvZG9MaXN0TmFtZUxvY2FsU3RvcmFnZSA9IFwiTXkgVG9kbyBMaXN0XCI7XG5cbihmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjcmVhdGVDaGVjayA9ICh0b2RvKSA9PiB7XG4gICAgICAgIGxldCBjaGVja0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrRGl2LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIGNvbnN0IGNoZWNrRGl2Q2xhc3NOYW1lID0gXCJjaGVja2VkXCJcbiAgICAgICAgY2hlY2tEaXYuY2hlY2tlZCA9IHRvZG8uY2hlY2tlZFxuICAgICAgICBjaGVja0Rpdi5jbGFzc0xpc3QuYWRkKGNoZWNrRGl2Q2xhc3NOYW1lKVxuICAgICAgICBjaGVja0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge2hhbmRsZUNoZWNrZWRDbGljayh0b2RvLnRvZG9JZCl9KVxuICAgICAgICByZXR1cm4gY2hlY2tEaXZcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gKHR5cGUsIHRvZG9JZCkgPT4ge1xuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNsYXNzTmFtZSA9IGAke3R5cGV9LWJ1dHRvbmBcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoYnV0dG9uQ2xhc3NOYW1lKVxuICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY3JlYXRlSWNvbih0eXBlLCB0b2RvSWQpKVxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtoYW5kbGVCdXR0b25DbGljayh0eXBlLCB0b2RvSWQpfSlcbiAgICAgICAgcmV0dXJuIGJ1dHRvblxuICAgIH0gXG4gICAgY29uc3QgY3JlYXRlSWNvbiA9ICh0eXBlLCBpZCkgID0+IHtcbiAgICAgICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGxldCBpY29uQ2xhc3NOYW1lID0gXCJcIlxuICAgICAgICBsZXQgaWNvbklkID0gYGBcbiAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZSA9IFwiZmFzIGZhLXRyYXNoXCI7XG4gICAgICAgICAgICAgICAgaWNvbklkID0gYGljb24tZGVsZXRlLSR7aWR9YFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZSA9IFwiZmFzIGZhLWVkaXRcIjtcbiAgICAgICAgICAgICAgICBpY29uSWQgPSBgaWNvbi1lZGl0LSR7aWR9YFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hlY2snOlxuICAgICAgICAgICAgICAgIGljb25DbGFzc05hbWUgPSBcImZhLWNoZWNrXCI7XG4gICAgICAgICAgICAgICAgaWNvbklkID0gYGljb24tY2hlY2stJHtpZH1gXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIG5vbmVcbiAgICAgICAgfVxuICAgICAgICBpY29uLmNsYXNzTmFtZSA9IGljb25DbGFzc05hbWU7XG4gICAgICAgIGljb24uaWQgPSBpY29uSWRcbiAgICAgICAgcmV0dXJuIGljb25cbiAgICB9XG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlQnV0dG9uQ2xpY2sodHlwZSwgdG9kb0lkKSB7XG4gICAgICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgIGhhbmRsZURlbGV0ZVRvZG8odG9kb0lkKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgICAgICAgaGFuZGxlRWRpdFRvZG8odG9kb0lkKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBub25lXG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hlY2tlZENsaWNrKHRvZG9JZCkge1xuICAgICAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvZG8taXRlbS0ke3RvZG9JZH1gKVxuICAgICAgICB0b2RvLmNsYXNzTGlzdC50b2dnbGUoJ2NvbXBsZXRlZCcpXG4gICAgICAgIGxldCB0b2RvcyA9IGxvYWRUb2RvTGlzdEZyb21MUygpXG4gICAgICAgIGNvbnN0IG15VG9kbyA9IHRvZG9zLmZpbmQodG9kbyA9PiB0b2RvLnRvZG9JZCA9PT0gdG9kb0lkKVxuICAgICAgICB0b2Rvcy5maW5kKHRvZG8gPT4gdG9kby50b2RvSWQgPT09IHRvZG9JZCkuY2hlY2tlZCA9ICFteVRvZG8uY2hlY2tlZDtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odG9kb0xpc3ROYW1lTG9jYWxTdG9yYWdlLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdFRvZG8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1pbnB1dCcpO1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9ICcnKSB7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIHRvZG9cbiAgICAgICAgICAgIGFkZFRvZG8oaW5wdXQudmFsdWUpXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IGRpZG50IGVudGVyIGFueSBUb2RvXCIpXG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVzZXQgdGhlIGlucHV0IHRleHRcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlRGVsZXRlVG9kbyh0b2RvSWQpIHtcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbFxuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9kby1saXN0LWl0ZW0tJHt0b2RvSWR9YClcbiAgICAgICAgcmVtb3ZlVG9kb0Zyb21Mb2NhbFN0b3JhZ2UodG9kb0lkKVxuICAgICAgICBsaS5yZW1vdmUoKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBoYW5kbGVFZGl0VG9kbyh0b2RvSWQpe1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9kby1saXN0LWl0ZW0tJHt0b2RvSWR9YClcbiAgICAgICAgbGV0IHRvZG9JdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvZG8taXRlbS0ke3RvZG9JZH1gKVxuICAgICAgICBlZGl0VG9kb1RvTG9jYWxTdG9yYWdlKHRvZG9JZCwgdG9kb0l0ZW0pXG4gICAgICAgIHRvZG9JdGVtLmRpc2FibGVkID0gIXRvZG9JdGVtLmRpc2FibGVkXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRvZG9JdGVtKHRvZG8pIHtcbiAgICAgICAgY29uc3Qge3RvZG9UZXh0LCB0b2RvSWR9ID0gdG9kbzsgXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgbGV0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0b2RvRGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbScpO1xuICAgICAgICB0b2RvRGl2LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB0b2RvRGl2LmlkID0gKGB0b2RvLWl0ZW0tJHt0b2RvSWR9YClcbiAgICAgICAgdG9kb0Rpdi52YWx1ZSA9IHRvZG9UZXh0XG4gICAgICAgIHRvZG8uY2hlY2tlZCA/IHRvZG9EaXYuY2xhc3NMaXN0LnRvZ2dsZSgnY29tcGxldGVkJykgOiAnJ1xuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBjcmVhdGVCdXR0b24oJ2RlbGV0ZScsIHRvZG9JZClcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbignZWRpdCcsIHRvZG9JZClcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IGNyZWF0ZUNoZWNrKHRvZG8pO1xuICAgIFxuICAgICAgICAvLyBhZGQgY29udGVudCB0byBsaVxuICAgICAgICBsaS5hcHBlbmRDaGlsZChjaGVja2VkKVxuICAgICAgICBsaS5hcHBlbmRDaGlsZCh0b2RvRGl2KVxuICAgICAgICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3RvZG8tbGlzdC1pdGVtJylcbiAgICAgICAgbGkuaWQgPSAoYHRvZG8tbGlzdC1pdGVtLSR7dG9kb0lkfWApXG4gICAgICAgIHJldHVybiBsaVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBhZGRUb2RvKHRvZG9UZXh0KSB7XG4gICAgICAgIGNvbnN0IHRvZG9MaXN0QXJyID0gbG9hZFRvZG9MaXN0RnJvbUxTKClcbiAgICAgICAgY29uc3QgdG9kb0lkID0gdG9kb0xpc3RBcnIubGVuZ3RoXG4gICAgICAgIGNvbnN0IG5ld1RvZG8gPSB7XCJ0b2RvVGV4dFwiOiB0b2RvVGV4dCwgXCJ0b2RvSWRcIjogdG9kb0lkLCBcImNoZWNrZWRcIjogZmFsc2V9XG4gICAgICAgIC8vIGhlcmUgd2UgbmVlZCB0byBhZGQgYSB1bFxuICAgICAgICBjcmVhdGVUb2RvTGlzdEVsZW1lbnRUYWcobmV3VG9kbylcbiAgICAgICAgLy8gc2F2ZSBuZXcgdG9kbyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIHNhdmVUb2RvVG9Mb2NhbFN0b3JhZ2UobmV3VG9kbylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVG9kb0xpc3RGcm9tTFMoKSB7XG4gICAgICAgIGxldCB0b2RvTGlzdEFyciA9IFtdXG4gICAgICAgIGxldCB0b2RvTGlzdEZyb21Mb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2RvTGlzdE5hbWVMb2NhbFN0b3JhZ2UpO1xuICAgICAgICBpZiAodG9kb0xpc3RGcm9tTG9jYWxTdG9yYWdlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRvZG9MaXN0QXJyID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZG9MaXN0QXJyID0gSlNPTi5wYXJzZSh0b2RvTGlzdEZyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvTGlzdEFyclxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVUb2RvVG9Mb2NhbFN0b3JhZ2UobmV3VG9kbykge1xuICAgICAgICBsZXQgdG9kb3MgPSBsb2FkVG9kb0xpc3RGcm9tTFMoKVxuICAgICAgICB0b2Rvcy5wdXNoKG5ld1RvZG8pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2RvTGlzdE5hbWVMb2NhbFN0b3JhZ2UsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSlcbiAgICB9ICBcblxuICAgIGZ1bmN0aW9uIHJlbW92ZVRvZG9Gcm9tTG9jYWxTdG9yYWdlKHRvZG9JZCl7XG4gICAgICAgIFxuICAgICAgICBsZXQgdG9kb3MgPSBsb2FkVG9kb0xpc3RGcm9tTFMoKVxuICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8udG9kb0lkICE9IHRvZG9JZClcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odG9kb0xpc3ROYW1lTG9jYWxTdG9yYWdlLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdFRvZG9Ub0xvY2FsU3RvcmFnZSh0b2RvSWQsIHRvZG9JdGVtKXtcbiAgICAgICAgbGV0IHRvZG9zID0gbG9hZFRvZG9MaXN0RnJvbUxTKClcbiAgICAgICAgdG9kb3MuZmluZCh0b2RvID0+IHRvZG8udG9kb0lkID09PSB0b2RvSWQpLnRvZG9UZXh0ID0gdG9kb0l0ZW0udmFsdWVcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odG9kb0xpc3ROYW1lTG9jYWxTdG9yYWdlLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9kb3MoKSB7XG4gICAgICAgIGxldCB0b2RvTGlzdEFyciA9IGxvYWRUb2RvTGlzdEZyb21MUygpXG4gICAgICAgIHRvZG9MaXN0QXJyLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgICAgIC8vIGhlcmUgd2UgbmVlZCB0byBhZGQgYSB1bFxuICAgICAgICAgICAgY3JlYXRlVG9kb0xpc3RFbGVtZW50VGFnKHRvZG8pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRvZG9MaXN0RWxlbWVudFRhZyh0b2RvKXtcbiAgICAgICAgbGV0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpO1xuICAgICAgICBsZXQgbGkgPSBjcmVhdGVUb2RvSXRlbSh0b2RvKSAgICBcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgICAgICBnZXRUb2RvcygpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3VibWl0VG9kbyk7XG4gICAgICB9KSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=