// import _ from 'lodash';
import './style.css';

const form = document.getElementById('form');
const task = document.getElementById('task');
const items = document.getElementById('items');

const listName = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// make task editable
const makeTaskEditable = () => {
  const taskAreas = document.querySelectorAll('.area');
  taskAreas.forEach((taskArea, index) => {
    taskArea.addEventListener('blur', () => {
      listName[index].text = taskArea.innerText;
      localStorage.setItem('tasks', JSON.stringify(listName));
    });
    taskArea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        listName[index].text = taskArea.innerText;
        localStorage.setItem('tasks', JSON.stringify(listName));
        taskArea.blur();
      }
    });
  });
};

// display task
const displayTask = () => {
  items.innerHTML = '';
  for (let i = 0; i < listName.length; i += 1) {
    const isChecked = listName[i].completed ? 'checked' : '';
    items.innerHTML += `
        <div class="to-do-item">
                <input id="check" type="checkbox" ${isChecked} onchange="checkcompleted(${i})">
                <div id="area" class="area" contentEditable="true">${listName[i].text}</div>
                <button id="delete" class="deleteBtn"><i onClick="deleteTask(${i})" class="fa-solid fa-trash-can"></i></button>
        </div>
        `;
    task.value = '';
  }
  makeTaskEditable();
};

// adding task
const addtask = (task) => {
  const data = {
    completed: false,
    text: task,
    index: listName.length + 1,
  };
  listName.push(data);
  localStorage.setItem('tasks', JSON.stringify(listName));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addtask(task.value);
  displayTask();
});

// deleting task
const deleteTask = (index) => {
  listName.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(listName));
  for (let i = 0; i < listName.length; i += 1) {
    listName[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(listName));
  displayTask();
};

window.onload = () => {
  displayTask();
  deleteTask();
};