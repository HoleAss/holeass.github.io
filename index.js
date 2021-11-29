import { Tasks } from "./components/Tasks/Tasks";
import { statusesList } from "./mocks/Statuses";
import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", function (event) {
  const tasks = new Tasks();
  tasks.render();
});
