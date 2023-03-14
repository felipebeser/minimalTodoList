import { Item } from './item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //save an item to local storage
  public save(item: Item) {
    localStorage.setItem(String(item.id), JSON.stringify(item));
  }

  //get an item from local storage
  public get(key: number): Item {
    let item = localStorage.getItem(String(key));
    if (item != null)
      return JSON.parse(item);
    return JSON.parse("{}");

  }

  public delete(item: Item) {
    localStorage.removeItem(String(item.id));
  }

  public key(index: number): string {
    let itemKey = localStorage.key(index);
    if (itemKey != null) {
      return itemKey;
    }
    return "";
  }

  public listKeys(): string[] {
    return Object.keys(localStorage);
  }

  public clear() {
    localStorage.clear();
  }

  public length() {
    return localStorage.length;
  }
}
