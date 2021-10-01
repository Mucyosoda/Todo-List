import './style.css';
import activeCheckbox from './check.js';

window.onload = function () {
  const todoList = document.querySelector('.todo-list');

  const listTable = [
    {
      description: 'go to the market',
      completed: false,
      index: 0,
    },
    {
      description: 'wash dishes',
      completed: false,
      index: 1,
    },
    {
      description: 'Complete my project',
      completed: false,
      index: 2,
    },
    {
      description: 'do sport',
      completed: false,
      index: 3,
    },
  ];

  let dayTodo = [];
  const localStoregeContent = localStorage.getItem('todo');
  if (localStoregeContent === null) {
    dayTodo = listTable;
  } else {
    dayTodo = JSON.parse(localStoregeContent);
  }

  localStorage.setItem('todo', JSON.stringify(dayTodo));
  console.log(dayTodo);
  for (let i = 0; i < listTable.length; i += 1) {
    listTable[i] = dayTodo[i];
  }

  function displayTodo(item) {
    return ` <div class='todo'>
  <div class="checkbox"><input type="checkbox"></div>
  <div class="description">${item.description}</div>
  <div><i class="fas fa-ellipsis-v"></i></div>
  </div>`;
  }

  document.addEventListener('DOMContentLoaded', displayTodo);
  todoList.innerHTML = `${dayTodo.map(displayTodo).join('')}`;
  todoList.addEventListener('click', activeCheckbox);
};
