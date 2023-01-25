import { v4 as uuidv4 } from 'uuid';
import './scss/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
const valueEl = document.querySelector('.input-value');
const toDoListEl = document.querySelector('.todo-list');

updateMarkupFromLocalStorage();
let arrTasks = checkLocalStorage();

form.addEventListener('submit', onSubmit);
toDoListEl.addEventListener('click', todoAction);
let selectedTask;

function onSubmit(event) {
  event.preventDefault();
  const inputValue = valueEl.value.trim();

  if (inputValue === '') {
    Notify.warning('Please type your Todo!');
  } else {
    const task = {
      id: uuidv4(),
      priority: 'standart',
      status: 'in progress',
      text: inputValue,
    };
    arrTasks.push(task);
    localStorage.setItem('data', JSON.stringify(arrTasks));
    updateMarkupFromLocalStorage();
    Notify.success('Successfully added!');
    valueEl.value = '';
  }
}

function updateMarkupFromLocalStorage() {
  let markUp;

  if (localStorage.length === 0) {
    markUp = `<li class="todo_item">
  <p class= "item_text">У вас не має справ</p>
</li>`;
  } else {
    let data = JSON.parse(localStorage.getItem('data'));
    markUp = data
      .map(
        item => `<li class="todo_item" data-id=${item.id}>
  <p class= "item_text" >${item.text}</p>
  <button class='edit control'>✏️</button>
  <button class='success control'>✅</button>
  <button class='delete control' data-id=${item.id}>❌</button>
</li>`
      )
      .join('');
  }
  toDoListEl.innerHTML = markUp;
}

function checkLocalStorage() {
  if (localStorage.getItem('data')) {
    return JSON.parse(localStorage.getItem('data'));
  } else {
    return [];
  }
}

function todoAction(event) {
  if (event.target.classList.contains('delete')) {
    arrTasks = arrTasks.filter(
      item => item.id !== event.target.parentNode.dataset.id
    );
    localStorage.setItem('data', JSON.stringify(arrTasks));
    Notify.success('Successfully deleted!');
    updateMarkupFromLocalStorage();
  } else if (event.target.classList.contains('edit')) {
    valueEl.value = event.target.parentNode.firstElementChild.textContent;
    form.lastElementChild.value = 'Відредагувати';
    selectedTask = arrTasks.find(
      item => item.id === event.target.parentNode.dataset.id
    );
    form.removeEventListener('submit', onSubmit);
    form.addEventListener('submit', onEdit);
  } else if (event.target.classList.contains('success')) {
    const currentId = event.target.parentNode.dataset.id;
    const currentItemEl = document.querySelector(`[data-id='${currentId}']`);
    currentItemEl.classList.toggle('status');
  } else {
    return;
  }
}

function onEdit(event) {
  event.preventDefault();
  selectedTask.text = valueEl.value;
  const indexOfSelectedTask = arrTasks.indexOf(selectedTask);
  arrTasks.splice(indexOfSelectedTask, 1, selectedTask);
  localStorage.setItem('data', JSON.stringify(arrTasks));
  updateMarkupFromLocalStorage();
  valueEl.value = '';
  form.removeEventListener('submit', onEdit);
  form.addEventListener('submit', onSubmit);
  form.lastElementChild.value = 'Додати в список';
  Notify.success('Successfully edited!');
}
