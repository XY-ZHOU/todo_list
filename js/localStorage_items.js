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
}