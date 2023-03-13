import { Item } from './item';
import { LocalStorageService } from './local-storage.service';
import { Component } from '@angular/core';
import { GlobalVariables } from './appGlobalVariables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  idCount = GlobalVariables.idCount;

  hover: boolean = false;

  constructor(private storage: LocalStorageService) {
  }

  title = 'todo';

  get items(): Item[] {
    let storedItems: Item[] = [];
    for (let i = 0; i < this.storage.length(); i++) {
      let item = this.storage.key(i);
      if (item != null) {
        storedItems[i] = item;
      }

    }
    console.log(storedItems);
    return storedItems;
  }

  addStorage(task: string) {
    this.idCount += 1;
    let item: Item = new Item(task, false);
    this.storage.save(item);
  }

  getStorage(index: number): Item {
    return this.storage.get(index);
  }

  getKeyStorage(task: number) {
    return this.storage.key(task);
  }

  deleteStorage(item: Item) {
    this.storage.delete(item);
  }

  changeState(item: Item) {
    item.done = !item.done
    this.storage.save(item);
  }
}
