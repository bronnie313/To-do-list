import './style.css';
import displayTask from './modules/displayTask.js';

const form = document.getElementById('form');
const task = document.getElementById('task');
const items = document.getElementById('items');

let listName = [];

const initList = () => {
  listName = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

// adding task
const addTask = (task) => {
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
  addTask(task.value);
  displayTask();
});

// deleting task
items.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'i') {
    const button = e.target.parentNode;
    const index = parseInt(button.id.replace('delete', ''), 10);
    listName.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(listName));
    for (let i = 0; i < listName.length; i += 1) {
      listName[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(listName));
    displayTask();
  }
});

window.onload = () => {
  initList();
  displayTask();
};

const clear = document.getElementById('clear');

clear.addEventListener('click', () => {
  listName = JSON.parse(localStorage.getItem('tasks')) || [];
  listName = listName.filter((item) => !item.completed);
  // localStorage.setItem('tasks', JSON.stringify(listName));
  for (let i = 0; i < listName.length; i += 1) {
    listName[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(listName));
  displayTask();
});

// clear.addEventListener('click', () => {
//   let todo = JSON.parse(localStorage.getItem('tasks'));
//   todo = todo.filter((item) => !item.completed);
//   localStorage.setItem('tasks', JSON.stringify(todo));
//   for (let i = 0; i < todo.length; i += 1) {
//     const todo = JSON.parse(localStorage.getItem('tasks')) || [];
//     todo[i].index = i + 1;
//     localStorage.setItem('tasks', JSON.stringify(todo));
//   }
//   displayTask();
// });
