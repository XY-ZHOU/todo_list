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