class StorageItems {
  constructor(localStorage) {
    this.storageItems = localStorage;
  }
  addATodo(newTodo) {
    let date = new Date().getTime();
    this.storageItems.setItem(date, JSON.stringify(newTodo));
  }
  finishATodo(content) {
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      if (value.content.trim() === content) {
        value.isCompleted = true;
        this.storageItems.setItem(key, JSON.stringify(value));
      }
    }
  }
  deleteATodo(content) {
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      if (value.content.trim() === content) {
        this.storageItems.removeItem(key);
      }
    }
  }
  getAllTodo() {
    let allTodo = [];
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      allTodo.push(value);
    }
    return allTodo;
  }
  getActiveTodo() {
    let activeTodo = [];
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      if (value.isCompleted === false) {
        activeTodo.push(value);
      }
    }
    return activeTodo;
  }
  getCompletedTodo() {
    let completedTodo = [];
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      if (value.isCompleted === true) {
        completedTodo.push(value);
      }
    }
    return completedTodo;
  }
  clearCompletedTodo() {
    for (let i = 0; i < this.storageItems.length; i++) {
      let key = this.storageItems.key(i);
      let value = JSON.parse(this.storageItems[key]);
      if (value.isCompleted === true) {
        this.storageItems.removeItem(key);
      }
    }
  }
  countLeft() {
    return this.getActiveTodo().length;
  }
}