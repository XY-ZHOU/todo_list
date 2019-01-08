const INPUTTXT = document.getElementById('inputTxt');
const LEFTITEMS = document.getElementById('leftItems');
const LISTS = document.getElementById('lists');
const BTNS = document.getElementById('btns');
let btnStatus = 'all';
let caseStatus = 'active';
let date;

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

function objToString(obj) {
  return JSON.stringify(obj);
}

function stringToObject(str) {
  return JSON.parse(str);
}