import { Item } from './item';
import { LocalStorageService } from './local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  hover: boolean = false;
  id: number = 0;
  constructor(private storage: LocalStorageService) {
  }
  ngOnInit(): void {
    let index = this.storage.length();
    if (index != 0) this.id = this.storage.length();
  }

  title = 'todo';

  get items(): Item[] {
    let storedKeys: string[] = [];
    let storedItems: Item[] = [];
    for (let i = 0; i < this.storage.length(); i++) {
      let key = this.storage.key(i);
      storedKeys[i] = key;
    }
    this.id = Math.max(...storedKeys.map(str => parseInt(str)));
    let storedKeysSorted = storedKeys.sort();
    for (let key in storedKeysSorted) {
      storedItems.push(this.storage.get(Number(key)));
    }
    console.log(storedItems);
    return storedItems.reverse();
  }

  addStorage(task: string) {
    let item: Item = new Item(this.id, task, false);
    this.id++;
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
