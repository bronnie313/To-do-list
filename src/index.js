import _ from 'lodash';
import './style.css';

// listName.sort((a, b) => a.index - b.index);

const ul = document.getElementById('items');
const listName = JSON.parse(window.localStorage.getItem('tasks')) || [];

const populate = () => {
  ul.innerHTML = '';
  for (let i = 0; i < listName.length; i += 1) {
    // const checkcompleted = listName[i].completed ? 'checked' : '';
    const li = document.createElement('li');
    li.className = 'to-do-item';
    li.id = `${listName[i].index}`;
    li.innerHTML = ` 
            <input type="checkbox">
            <p id="editable" class="editable">${listName[i].text}</p>
            <button id="viewmore" class="view-more"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <button id="delete" class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
            <button id="edit" class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
            <button id="save" class="saveBtn"><i class="fa-regular fa-floppy-disk"></i></button>
            
            
        `;
    ul.appendChild(li);

    const viewMore = document.querySelectorAll('.view-more');
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    const editBtn = document.querySelectorAll('.editBtn');
    const saveBtn = document.querySelectorAll('.saveBtn');

    viewMore[i].addEventListener('click', () => {
      viewMore[i].style.display = 'none';
      deleteBtn[i].style.display = 'block';
      editBtn[i].style.display = 'block';
      saveBtn[i].style.display = 'none';
    });

    editBtn[i].addEventListener('click', () => {
      saveBtn[i].style.display = 'block';
      viewMore[i].style.display = 'none';
      deleteBtn[i].style.display = 'none';
      editBtn[i].style.display = 'none';
    });

    const editable = document.querySelectorAll('.editable');
    const edit = document.querySelectorAll('.editBtn');

    edit[i].addEventListener('click', (text) => {
      editable[i].value = text;

      editable[i].contentEditable = true;
      editable[i].focus();
    });

    const editTask = li.querySelector('#editable');
    const save = document.querySelectorAll('.saveBtn');

    save[i].addEventListener('click', (event) => {
      let todo3 = JSON.parse(window.localStorage.getItem('tasks'));
      listName[i].text = editTask.textContent;
      const c = event.target.parentNode;
      const d = c.parentNode.parentNode.parentNode.id
      console.log(textContent)
      localStorage.setItem('task', JSON.stringify(todo3));
      location.reload;
      
    });

    save[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        save[i].blur();
      }
    });

    deleteBtn[i].addEventListener('click', (event) => {
      let todo = JSON.parse(window.localStorage.getItem('tasks'));
      const a = event.target.parentNode;
      const b = a.parentNode.id;
      const task = todo[b - 1];
      todo = todo.filter((item) => item !== task);
      localStorage.setItem('tasks', JSON.stringify(todo));

      const todo2 = JSON.parse(window.localStorage.getItem('tasks'));
      for (let j = 1; j <= todo2.length; j += 1) {
        todo2[j - 1].index = j;
      }
      localStorage.setItem('tasks', JSON.stringify(todo2));
      location.reload();
    });

    // save[i].addEventListener('blur', (text) => {
    //   listName[i].text = textContent;
    //   localStorage.setItem('tasks',JSON.stringify(listName));
    //   location.reload
    // });
  }
};

populate();

const enter = document.getElementById('enter');
const addTask = document.getElementById('addTask');

const createTask = (addTask) => {
  const taskobject = {
    completed: false,
    text: addTask,
    index: listName.length + 1,
  };
  listName.push(taskobject);
  localStorage.setItem('tasks', JSON.stringify(listName));
};

enter.addEventListener('click', (e) => {
  e.preventDefault();
  createTask(addTask.value);
  addTask.value = '';
  populate();
});
