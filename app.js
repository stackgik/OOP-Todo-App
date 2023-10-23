"use strict";

const todoContainer = document.querySelector(".todo");
const todosContainer = document.querySelector(".todos__container");
const todoInputField = document.querySelector(".todo__input-field");
const todoBtn = document.querySelector(".todo__btn");

class Todo {
  #todos = [];

  constructor() {
    todoContainer.classList.add("todo--active");
    this.#getLocalStorage();
    this.#renderTodo();
    this.#initializeEventListeners();
  }

  #collectUserInput() {
    this.todo = todoInputField.value;
    todoInputField.value = "";
  }

  #renderTodo() {
    todoBtn.addEventListener("click", () => {
      if (todoInputField.value === "") {
        console.warn("please input something in the input field");
      } else {
        this.#collectUserInput(); //collects user todo
        this.#todos.push(this.todo); //adds the todo to the empty array
        this.#setLocalStorage(); //sets the local storage

        todosContainer.innerHTML = ""; //clears the content of the todos container

        this.#displayTodo();
      }
    });
  }

  #displayTodo() {
    this.#todos.forEach((todo, index) => {
      let html = `
      <div class="todos__content">
        <input
          type="text"
          class="todo__text-field"
          value= "${todo}"
          readonly
        />
      </div>
      <div class="todos__content-actions">
        <i class="fa-solid fa-trash-can delete" data-delete-todo = ${index}></i>
        <i class="fa-solid fa-pen-to-square edit" data-edit-todo = ${index}></i>
      </div>
    `;

      todosContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  // Event delegation for the action buttons
  #initializeEventListeners() {
    todosContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
        this.#editTodo(e.target);
      } else if (e.target.classList.contains("delete")) {
        this.#deleteTodo(e.target);
      }
    });
  }

  #editTodo(editBtn) {
    const index = editBtn.dataset.editTodo;
    const todoField =
      todosContainer.querySelectorAll(".todo__text-field")[index];

    if (editBtn.classList.contains("fa-pen-to-square")) {
      editBtn.classList.replace("fa-pen-to-square", "fa-floppy-disk");
      todoField.removeAttribute("readonly");
      todoField.focus();
    } else {
      editBtn.classList.replace("fa-floppy-disk", "fa-pen-to-square");
      todoField.setAttribute("readonly", "readonly");
    }
  }

  #deleteTodo(deleteBtn) {
    const index = deleteBtn.dataset.deleteTodo;
    this.#todos.splice(index, 1);
    this.#setLocalStorage();
    todosContainer.innerHTML = "";
    this.#displayTodo();
  }

  #setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.#todos));
  }

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todos"));
    this.#todos = data;
    this.#displayTodo();
  }
}

const app = new Todo();
