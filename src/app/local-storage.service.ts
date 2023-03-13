import { Item } from './item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //save an item to local storage
  public save(item: Item) {
    localStorage.setItem(item.task, JSON.stringify(item));
  }

  //get an item from local storage
  public get(index: number): Item {
    let item = localStorage.getItem(String(index));
    if (item != null)
      return JSON.parse(item);
    return JSON.parse("{}");

  }


  public delete(item: Item) {
    localStorage.removeItem(item.task);
  }

  public key(index: number): Item {
    let itemKey = localStorage.key(index);
    let item = localStorage.getItem(String(itemKey));
    if (item != null) {
      return JSON.parse(item);
    }
    return JSON.parse("{}");
  }

  public clear() {
    localStorage.clear();
  }

  public length() {
    return localStorage.length;
  }
}
