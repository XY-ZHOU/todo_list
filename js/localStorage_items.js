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
      console.log(value.content.trim(), content, value.content.trim() === content)
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
      console.log(value, this.storageItems[key]);
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
}