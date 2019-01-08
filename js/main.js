const INPUTTXT = document.getElementById('inputTxt');
const LEFTITEMS = document.getElementById('leftItems');
const LISTS = document.getElementById('lists');
const BTNS = document.getElementById('btns');
let btnStatus = 'all';
let caseStatus = 'active';
let date;
allTodo();

function addTodo() {
  if (event.keyCode == 13) {
    getNewTodo();
  }
  INPUTTXT.value = '';
}

function getNewTodo() {
  if (INPUTTXT.value !== "") {
    date = new Date().toLocaleString();
    let content = {};
    content.txt = INPUTTXT.value;
    content.status = caseStatus;
    let contentStr = objToString(content);
    localStorage.setItem(date, contentStr);
  }
  if (btnStatus != 'compeleted') {
    showList(date, INPUTTXT.value, caseStatus);
  }
  leftItems.innerHTML = 'Left Items:' + countLeft();
}

function showList(date, param, status) {
  let list = document.createElement('div');
  list.innerHTML = '<p>' + param + '</p><a href="#" class="deleteList">X</a>';
  list.classList.add('list');
  list.setAttribute("date", date);
  list.setAttribute("status", status);
  LISTS.insertBefore(list, LISTS.childNodes[0]);
}
//list's listener of click
LISTS.addEventListener('click', function(e) {
  var event = event || window.event;
  var target = event.target || event.srcElement;
  //case was done
  if (target.parentNode.className === 'list') {
    let date = target.parentNode.getAttribute("date");
    target.innerHTML = '<del>' + target.innerHTML + '</del>';
    let content = {};
    content.txt = target.innerHTML;
    content.status = 'compeleted';
    let contentStr = objToString(content);
    localStorage.setItem(date, contentStr);
    target.parentNode.setAttribute("status", 'compeleted');;
  }
  //delete one case
  if (target.className === 'deleteList') {
    deleteOneCase(target.parentNode);
  }
  leftItems.innerHTML = 'Left Items:' + countLeft();
});

function deleteOneCase(param) {
  let date = param.getAttribute("date");
  param.parentNode.removeChild(param);
  localStorage.removeItem(date);
}

function allTodo() {
  LISTS.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = stringToObject(localStorage[key]);
    //console.log(key, localStorage[key]);
    showList(key, value.txt, value.status);
  }
  leftItems.innerHTML = 'Left Items:' + countLeft();
}

function todoOfActiveOrCompleteted(param) {
  btnStatus = param;
  LISTS.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = stringToObject(localStorage[key]);
    if (Object.values(value).includes(param)) {
      showList(key, value.txt, param);
    }
  }
  leftItems.innerHTML = 'Left Items:' + countLeft();
}

function countLeft() {
  let leftIndex = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = stringToObject(localStorage[key]);
    if (Object.values(value).includes('active')) {
      leftIndex++;
    }
  }
  return leftIndex;
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

function showClearCompletedBtn() {
  let leftIndex = countLeft();
  if (leftIndex < 2) {
    clearCompleted.classList.add('disappear');
  } else {
    clearCompleted.classList.remove('disappear');
  }
}

function clearCompeletedCases() {
  LISTS.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = stringToObject(localStorage[key]);
    if (Object.values(value).includes('compeleted')) {
      localStorage.removeItem(key);
    } else {
      showList(key, value.txt, value.status);
    }
  }
  leftItems.innerHTML = 'Left Items:' + countLeft();
}

function objToString(obj) {
  return JSON.stringify(obj);
}

function stringToObject(str) {
  return JSON.parse(str);
}