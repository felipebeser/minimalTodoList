export class Item {
  id: number;
  task: string;
  done: boolean;

  constructor(id: number, task: string, done: boolean) {
    this.id = id;
    this.task = task;
    this.done = done;
  }
}
