import { Item } from './item';
import { LocalStorageService } from './local-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  help: boolean = false;
  id: number = 0;
  constructor(private storage: LocalStorageService) {
  }

  title = 'todo';

  get items(): Item[] {
    let storedKeys: string[] = this.storage.listKeys();
    let storedKeysSorted = storedKeys.map(str => parseInt(str)).sort((a, b) => a - b);

    let storedItems: Item[] = [];

    storedKeysSorted.forEach(key => {
      storedItems.unshift(this.storage.get(key));
    })
    let numKeys = storedKeys.map(str => parseInt(str)).filter(i => !isNaN(i));
    let lastId = Math.max(...numKeys);
    this.id = lastId + 1;
    if (this.id < 0) this.id = 0;
    return storedItems;
  }

  addStorage(task: string) {
    if (task) {
      let item: Item = new Item(this.id, task, false);
      this.storage.save(item);
    }
    return null;
  }

  getStorage(key: number): Item {
    return this.storage.get(key);
  }

  getKeyStorage(task: number) {
    return this.storage.key(task);
  }

  deleteStorage(item: Item) {
    this.storage.delete(item);
  }

  changeState(item: Item) {
    if (!item.done) {
      item.done = !item.done
      this.storage.save(item);
    }
    else {
      this.storage.delete(item);
    }
  }

  helpToggle(): void {
    this.help = !this.help;
  }
}
