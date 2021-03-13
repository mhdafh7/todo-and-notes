import showAlert from "./app.js";
// ############ TODO ###########

// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// e listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value !== "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Todo li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    newTodo.innerText = todoInput.value;

    // Store
    Store(storeTodo(todoInput.value, "incomplete"));
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let noOfTodos = 0;
    todos.forEach((todo) => {
      if (!(todo.filter === "completed")) {
        noOfTodos++;
      }
    });
    document.querySelector(".todo-number").innerText = noOfTodos;

    // Check button(complete)
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML =
      '<i class="material-icons md-36">check_circle_outline</i>';
    todoDiv.appendChild(checkButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML =
      '<i class="material-icons md-36">delete_outline</i>';
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);

    todoInput.value = "";
  } else {
    showAlert("Todo title cannot be empty!!!");
  }
}
// Check and delete todo
function checkDelete(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("slideoff");
    // Remove from storage
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
    removeTodo(todo);
  }
  // check todo
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    checkTodo(todo);
  }
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let noOfTodos = 0;
  todos.forEach((todo) => {
    if (!(todo.filter === "completed")) {
      noOfTodos++;
    }
  });
  document.querySelector(".todo-number").innerText = noOfTodos;
}

// filter todo

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.dataset.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Store the todo as an object for filter persistence
function storeTodo(todoItem, filterClass) {
  let todo = {
    title: todoItem,
    filter: filterClass,
  };
  return todo;
}

// Store
function Store(todoItem) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todoItem);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// UI
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let noOfTodos = 0;
  todos.forEach((todo) => {
    if (!(todo.filter === "completed")) {
      noOfTodos++;
    }
  });
  document.querySelector(".todo-number").innerText = noOfTodos;

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Todo li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    newTodo.innerText = todo.title;
    if (todo.filter === "completed") {
      newTodo.parentElement.classList.add("completed");
    }

    // Check button(complete)
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML =
      '<i class="material-icons md-36">check_circle_outline</i>';
    todoDiv.appendChild(checkButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML =
      '<i class="material-icons md-36">delete_outline</i>';
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
  });
}

// Remove todo
function removeTodo(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoTitle = todo.children[0].innerText;
  const todoIndex = todos.find((todo) => todo.title === todoTitle);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Add persistence to completed class(check)
function checkTodo(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoTitle = todo.children[0].innerText;
  let todoItem = todos.find((todo) => todo.title === todoTitle);
  todoItem.filter = "completed";
  todo.classList.add("completed");
  todos.splice(todos.indexOf(todoItem), 1);
  todos.unshift(todoItem);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Select dropdown
document
  .querySelector(".filter-select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".filter-select").classList.toggle("open");
  });
for (const option of document.querySelectorAll(".filter-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".filter-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".filter-select").querySelector(
        ".filter-select__trigger span"
      ).textContent = this.textContent;
    }
  });
}

window.addEventListener("click", function (e) {
  const select = document.querySelector(".filter-select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});
