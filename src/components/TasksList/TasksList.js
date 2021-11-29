import { Task } from "../Task";

export class TasksList {
  constructor(tasksList, status) {
    this.tasksList = tasksList;
    this.status = status;
  }

  templateWrapper() {
    return `<ul class="list-group" data-type="${this.status}"></ul>`;
  }
  render() {
    const el = document.createElement("div");
    el.innerHTML = this.templateWrapper();
    this.el = el.firstElementChild;
    this.tasksList.forEach((item) => {
      this.el.append(item.render());
    });

    return this.el;
  }

  destroy() {
    this.el = null;
  }
}
