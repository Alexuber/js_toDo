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

const form = document.querySelector('form');
const valueEl = document.querySelector('.input-value');
const toDoListEl = document.querySelector('.todo-list');

const arrTasks = [];

function handleSubmitForm(e) {
  e.preventDefault();
  const inputValue = valueEl.value;
  const task = {
    id: uuidv4(),
    priority: 'standart',
    status: 'in progress',
    text: inputValue,
  };
  arrTasks.push(task);
  localStorage.setItem('data', JSON.stringify(arrTasks));

  updateMarkup();
}

form.addEventListener('submit', handleSubmitForm);

function updateMarkup() {
  let markup;

  if (localStorage.length === 0) {
    markup = `<li class="list__item">
        <p class="list__desc">You dont have deals</p>
      </li>`;
  } else {
    let data = JSON.parse(localStorage.getItem('data'));
    //     const markup = `<li class="list__item">
    //   <p class="list__desc">All good</p>
    //   <button class="done-btn">Done</button>
    //   <button class="edit-btn">Edit</button>
    //   <button class="delete-btn">Delete</button>
    // </li>`;
  }
  toDoListEl.innertHTML('beforeend', markup);
}
