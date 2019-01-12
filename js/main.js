const LISTS = document.getElementById('lists');
const BTNS = document.getElementById('btns');
let btnStatus;
let storageItems = new StorageItems(localStorage);
allTodos();

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

function allTodos() {
  btnStatus = 'all';
  LISTS.innerHTML = '';
  let allItems = storageItems.getAllTodo();
  for (let elem of allItems) {
    showList(elem);
  }
  showLeftAndClearCoCompleteted();
}

function activeTodos() {
  btnStatus = 'active';
  LISTS.innerHTML = '';
  let activeItems = storageItems.getActiveTodo();
  for (let elem of activeItems) {
    showList(elem);
  }
  showLeftAndClearCoCompleteted();
}

function completedTodos() {
  btnStatus = 'completed';
  LISTS.innerHTML = '';
  let completedItems = storageItems.getCompletedTodo();
  for (let elem of completedItems) {
    showList(elem);
  }
  showLeftAndClearCoCompleteted();
}

function showLeftAndClearCoCompleteted() {
  let leftIndex = storageItems.countLeft();
  let leftItems = document.getElementById('leftItems');
  let clearCompleted = document.getElementById('clearCompleted');
  leftItems.innerHTML = 'Left Items:' + leftIndex;
  if (btnStatus == 'active' || (btnStatus != 'active' && leftIndex < 2)) {
    clearCompleted.classList.add('hide');
  } else {
    clearCompleted.classList.remove('hide');
  }
}

function clearCompeletedTodos() {
  LISTS.innerHTML = '';
  storageItems.clearCompletedTodo();
  showLeftAndClearCoCompleteted();
}
//list's listener of click
LISTS.addEventListener('click', function(e) {
  var event = event || window.event;
  var target = event.target || event.srcElement;
  //case was done
  console.log(target);
  if (target.className === 'list' || target.parentNode.className === 'list') {
    finishTodo(target);
  }
  //delete one case
  if (target.className === 'deleteBtn') {
    let content = target.previousElementSibling.innerText.trim();;
    target.parentNode.parentNode.removeChild(target.parentNode);
    storageItems.deleteATodo(content);
  }
  showLeftAndClearCoCompleteted();
});

function finishTodo(target) {
  let parentNode = target.className === 'list' ? target : target.parentNode;
  let content = parentNode.children[1].innerText.trim();
  storageItems.finishATodo(content);
  parentNode.children[0].setAttribute("checked", true);
  parentNode.children[1].classList.add('done');
}
BTNS.addEventListener('click', function(e) {
  var event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.className === 'btn') {
    target.classList.add('selected');
    let siblings = Array.from(target.parentNode.children);
    for (let elem of siblings) {
      console.log(elem, target, elem !== target);
      if (elem !== target) {
        elem.classList.remove('selected');
      }
    }
  }
});