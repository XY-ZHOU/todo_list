const LISTS = document.getElementById('lists');
const BTNS = document.getElementById('btns');
let btnStatus;
let storageItems = new StorageItems(localStorage);

function addTodo(event) {
  let input = document.getElementById('inputTxt');
  if (event.keyCode == 13 && input.value) {
    let newTodo = new Todo(input.value, false);
    storageItems.addATodo(newTodo);
    if (btnStatus != 'completed') {
      showList(newTodo);
    }
  }
  input.value = '';
  showLeftAndClearCoCompleteted();
}

function showList(newTodo) {
  let list = document.createElement('div');
  list.classList.add('list');
  list.innerHTML = '<input type="checkbox" /><label >' + newTodo.content + '</label><button class="deleteBtn">X</button>';
  list.children[0].setAttribute('value', newTodo.content);
  if (newTodo.isCompleted == true) {
    console.log(list.children);
    list.children[0].setAttribute('checked', true);
    list.children[1].classList.add('done');
  }
  LISTS.insertBefore(list, LISTS.childNodes[0]);
}