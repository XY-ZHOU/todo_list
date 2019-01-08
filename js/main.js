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