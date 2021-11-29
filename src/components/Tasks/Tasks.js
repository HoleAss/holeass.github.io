import { tasks } from "../../mocks/tasks";
import { statusesList as statuses } from "../../mocks/Statuses";
import { TasksList } from "../TasksList";
import { Task } from "../Task";

const HEADER = "header";
const DATA = "data";
export class Tasks {
  constructor() {
    this.loadTasks();
    this.elements = {};
    this.statuses = statuses;
    this.tasksList = this.tasksByStatuses;
  }

  loadTasks() {
    this.tasks = tasks.map((item) => new Task(item));
  }

  get tasksByStatuses() {
    const tasksByStatuses = {};
    this.statuses.forEach((status) => {
      tasksByStatuses[status.name] = this.tasks.filter(
        (task) => task.status === status.name
      );
    });
    return tasksByStatuses;
  }

  template() {
    return `
    <div class="row tasks-header"></div>
    <div class="row tasks-data"></div>
    `;
  }

  renderHeader() {
    const headerHtml = this.statuses
      .map((item) => `<div class="cli-header ${item.name}">${item.title}</div>`)
      .join("");

    this.elements[HEADER] = this.el.querySelector(".tasks-header");
    this.elements[HEADER].innerHTML = headerHtml;
  }
  renderData() {
    if (this.el) {
      const tasksContainers = this.el.querySelector(".tasks-data");
      tasksContainers.innerHTML = "";
      this.statuses.forEach((status) => {
        const tasksList = new TasksList(
          this.tasksByStatuses[status.name],
          status.name
        );

        tasksContainers.append(tasksList.render());
      });
    }
  }

  render() {
    const wrapper = document.querySelector("#container");
    if (!wrapper) {
      this.el = document.createElement("div");
    }
    this.el = wrapper;
    this.el.innerHTML = this.template();
    this.renderHeader();
    this.renderData();
    this.initEventListeners();
  }

  handleTaskSelected(event) {
    const taskId = event.detail.id;
    if (taskId) {
      const prevSelectedTask = this.tasks.find((item) => item.isActive);
      const newSelectedTask = this.tasks.find((item) => item.id === taskId);
      if (prevSelectedTask) {
        prevSelectedTask.isActive = false;
        prevSelectedTask.render();
      }
      newSelectedTask.isActive = true;
      newSelectedTask.render();
    }
  }

  get selectedTask() {
    return this.tasks.find((task) => task.isActive);
  }

  handleKeyDown(event) {
    if (!this.selectedTask) return;
    const selectedList = this.tasksList[this.selectedTask.status];
    const selectedStatusIndex = this.statuses.findIndex(
      (item) => item.name === this.selectedTask.status
    );
    const selectedListIndex = selectedList.findIndex(
      (item) => item.id === this.selectedTask.id
    );

    if (this.selectedTask) {
      switch (event.key) {
        case "ArrowUp":
          if (selectedListIndex !== -1 && selectedListIndex > 0) {
            if (event.shiftKey) {
              // this.moveTaskUp();
              const tempTask = selectedList[selectedListIndex - 1];
              selectedList[selectedListIndex - 1] =
                selectedList[selectedListIndex];
              selectedList[selectedListIndex] = tempTask;
              tempTask.el.before(this.selectedTask.el);
              break;
            }
            selectedList[selectedListIndex - 1].isActive = true;
            selectedList[selectedListIndex - 1].render();
            selectedList[selectedListIndex].isActive = false;
            selectedList[selectedListIndex].render();
          }
          break;
        case "ArrowDown":
          if (
            selectedListIndex !== -1 &&
            selectedListIndex < selectedList.length - 1
          ) {
            if (event.shiftKey) {
              const tempTask = selectedList[selectedListIndex + 1];
              selectedList[selectedListIndex + 1] =
                selectedList[selectedListIndex];
              selectedList[selectedListIndex] = tempTask;
              tempTask.el.after(this.selectedTask.el);
              break;
            }
            selectedList[selectedListIndex + 1].isActive = true;
            selectedList[selectedListIndex + 1].render();
            selectedList[selectedListIndex].isActive = false;
            selectedList[selectedListIndex].render();
          }
          break;

        case "ArrowLeft":
          if (event.shiftKey) {
            if (selectedStatusIndex !== -1 && selectedStatusIndex > 0) {
              const status = this.statuses[selectedStatusIndex].name;
              const newStatus = this.statuses[selectedStatusIndex - 1].name;
              this.selectedTask.status = newStatus;
              this.tasksList[newStatus].push(this.selectedTask);
              this.tasksList[status].splice(selectedListIndex, 1);

              this.el
                .querySelector(`[data-type=${newStatus}]`)
                .append(this.selectedTask.el);
            }
            break;
          }

        case "ArrowRight":
          if (event.shiftKey) {
            if (
              selectedStatusIndex !== -1 &&
              selectedStatusIndex < this.statuses.length - 1
            ) {
              const status = this.statuses[selectedStatusIndex].name;
              const newStatus = this.statuses[selectedStatusIndex + 1].name;
              this.selectedTask.status = newStatus;
              this.tasksList[newStatus].push(this.selectedTask);
              this.tasksList[status].splice(selectedListIndex, 1);
              this.el
                .querySelector(`[data-type=${newStatus}]`)
                .append(this.selectedTask.el);
            }
          }
          break;
      }
    }
  }
  initEventListeners() {
    this.el.addEventListener(
      "taskSelected",
      this.handleTaskSelected.bind(this)
    );
    this.keyDownHandler = this.handleKeyDown.bind(this);
    document.body.addEventListener("keydown", this.keyDownHandler);
  }
  removeEventListeners() {
    if (this.keyDownHandler)
      document.body.removeEventListener("keydown", this.keyDownHandler);
  }
  destroy() {
    this.removeEventListeners();
    this.el = null;
    this.elements = null;
  }
}
