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