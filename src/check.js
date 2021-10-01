let taskList = [];
let completedTasks = [];

const updateCompletedListArray = () => {
  completedTasks = [];

  taskList.forEach((task) => {
    if (task.done) completedTasks.push(`${taskList.indexOf(task)}`);
  });
};

const saveLocalList = () => {
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

const toggleChecked = (e) => {
  const checkStatus = e.target.checked;
  const task = e.target.parentElement;
  const taskId = task.id;
  let removed = false;

  taskList[taskId].done = checkStatus;

  if (completedTasks.length === 0) {
    completedTasks.push(taskId);
  } else {
    completedTasks.forEach((index) => {
      if (taskId === index) {
        completedTasks.splice(completedTasks.indexOf(index), 1);
        removed = true;
      }
    });

    if (!removed) {
      completedTasks.push(taskId);
      completedTasks.sort();
    }
  }

  saveLocalList();
};

const updateListView = () => {
  const ul = document.getElementById('taskList');

  ul.innerHTML = '';

  taskList.forEach((task) => {
    const listItem = document.createElement('li');
    const taskLabel = document.createElement('label');
    const delBtn = document.createElement('span');
    const dotBtn = document.createElement('span');
    const checkbox = document.createElement('input');

    listItem.className = 'task';
    listItem.id = taskList.indexOf(task);

    taskLabel.className = 'taskLabel';
    taskLabel.textContent = task.name;
    taskLabel.htmlFor = `c${taskList.indexOf(task)}`;

    delBtn.className = 'deleteTaskBtn';
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';

    dotBtn.className = 'dotbtn';
    dotBtn.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    dotBtn.onclick = '';

    checkbox.className = 'taskCheckbox';
    checkbox.id = `c${taskList.indexOf(task)}`;
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onclick = toggleChecked;

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(dotBtn);
    listItem.appendChild(delBtn);
    ul.appendChild(listItem);
  });
};

function checkDuplicate(task) {
  let matchFound = false;

  taskList.forEach((t) => {
    if (t.name === task) matchFound = true;
  });

  return matchFound;
}

function addToList(task) {
  if (checkDuplicate(task)) {
    return;
  }

  taskList.push({
    name: task,
    done: false,
  });

  updateListView();

  localStorage.setItem('taskList', JSON.stringify(taskList));
  document.querySelector('#taskInput').value = '';
}

document.querySelector('#taskInput').addEventListener('keypress', function (e) {
  const key = e.which || e.keyCode;
  if (key === 13 && document.querySelector('#taskInput').value.length > 0) {
    addToList(this.value.trim());
  }
});

if (JSON.parse(localStorage.getItem('taskList'))) {
  taskList = JSON.parse(localStorage.getItem('taskList'));
} else localStorage.setItem('taskList', JSON.stringify(taskList));

updateCompletedListArray();
updateListView();
