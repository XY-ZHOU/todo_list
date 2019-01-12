class StorageItems {
  constructor(localStorage) {
    this.storageItems = localStorage;
  }
  addATodo(newTodo) {
    let date = new Date().getTime();
    this.storageItems.setItem(date, JSON.stringify(newTodo));
  }
}