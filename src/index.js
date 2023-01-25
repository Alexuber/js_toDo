// можливість додавати справи
// можливість редагувати текст
// можливість видалення
// можл-ть фільтрації
// можл-ть надати статус "виконано"
// можл-ть встановити пріоритет
// saving
// check localStorage on already having data
// insert data from localStorage on our page
import { v4 as uuidv4 } from 'uuid';
import './scss/main.scss';

const form = document.querySelector('form');
const valueEl = document.querySelector('.input-value');
const toDoListEl = document.querySelector('.todo-list');
const toDoListItem = document.querySelectorAll('.todo_item');

updateMarkupFromLocalStorage();
let arrTasks = checkLocalStorage();

form.addEventListener('submit', onSubmit);
toDoListEl.addEventListener('click', todoAction);
let selectedTask;

function onSubmit(event) {
  event.preventDefault();
  const inputValue = valueEl.value;
  const task = {
    id: uuidv4(),
    priority: 'standart',
    status: 'in progress',
    text: inputValue,
  };
  arrTasks.push(task);
  localStorage.setItem('data', JSON.stringify(arrTasks));
  updateMarkupFromLocalStorage();
  valueEl.value = '';
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
  <button class='edit'>✏️</button>
  <button class='success'>✅</button>
  <button class='delete' data-id=${item.id}>❌</button>
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
    console.log(event.target.parentNode.dataset.id);
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
}
