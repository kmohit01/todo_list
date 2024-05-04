// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Load todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <button onclick="markAsCompleted(${index})">Done</button>
        <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Add todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

// Mark todo as completed
function markAsCompleted(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
addButton.addEventListener('click', addTodo);

// Initial render
renderTodos();