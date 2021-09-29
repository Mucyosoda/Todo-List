// eslint-disable-no-unused-vars
import _ from 'lodash';
import './style.css';

const listTable = [
  {
    description: 'go to the market',
    completed: true,
    index: 1,
  },
  {
    description: 'wash dishes',
    completed: true,
    index: 2,
  },
  {
    description: 'play guitar',
    completed: true,
    index: 3,
  },
];

const todoList = document.querySelector('.todo-list');
// eslint-disable-no-use-before-define
document.addEventListener('DOMContentLoaded', displayTodo);

function displayTodo(item) {
  return ` <div class='todo'>
  <div class="checkbox"><input type="checkbox"></div>
  <div class="description">${item.description}</div>
  <div><i class="fas fa-ellipsis-v"></i></div>
  </div>`;
}

todoList.innerHTML = `${listTable.map(displayTodo).join('')}`;
