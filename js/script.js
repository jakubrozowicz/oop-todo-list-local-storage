const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]")

//local Storage
class Storage {
  static addToStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }
  static getStorage() {
    let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"))
    return storage;
  }
}

let todoArr = Storage.getStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //random number for the todo
  let id = Math.random() * 100000;
  const todo = new Todo(id, input.value);

  if (input.value !== "") {
    todoArr.push(todo);
  } else return alert("Pole nie może być puste!");

  UI.displayData();
  UI.clearInput();

  //remove from DOM
  UI.removeTodo();

  //add to Storage
  Storage.addToStorage(todoArr);
});

//stworzenie instancji obiektu
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

//wyświetlenie todo w DOM
class UI {
  static checkEmpty() {
    if (input.value === "") return alert("Pole nie może być puste!");
  }

  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id=${item.id}>&#10060;</span></div>
            `
    });
    lists.innerHTML = (displayData).join(" ");
  }

  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;

      //remove from todoArr
      UI.removeArrayTodo(btnId);

    });
  }

  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addToStorage(todoArr);
  }
}

//once the browser is loaded

window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  //remove from DOM
  UI.removeTodo();
})