import './style.css';

const form = document.getElementById('form');
const task = document.getElementById('task');
const items = document.getElementById('items');

let listName = [];

const initList = () => {
  listName = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

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
        <input id="check${i}" type="checkbox" ${isChecked}>
        <div id="area${i}" class="area" contentEditable="true">${listName[i].text}</div>
        <button id="delete${i}" class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    task.value = '';
  }
  makeTaskEditable();
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
