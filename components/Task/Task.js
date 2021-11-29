export class Task {
  constructor({ id, name, status, isActive, draggable }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.isActive = isActive || false;
    this.draggable = draggable;
    this.initElement();
  }

  get template() {
    return `<li class="list-group-item ${
      this.isActive ? "active-item" : ""
    }" draggable="${this.draggable}" id = "${this.id}">${this.name}</li>`;
  }

  initElement() {
    if (!this.el) {
      const element = document.createElement("div");
      element.innerHTML = this.template;
      this.el = element.firstElementChild;
    }
    this.initEventListeners();
  }
  render() {
    const classList = this.el.classList;
    if (!classList.contains("active-item") && this.isActive)
      classList.add("active-item");
    if (classList.contains("active-item") && !this.isActive)
      classList.remove("active-item");
    return this.el;
  }

  handleClick() {
    if (this.el) {
      const clickEvent = new CustomEvent("taskSelected", {
        detail: { id: this.id },
        bubbles: true,
      });
      this.el.dispatchEvent(clickEvent);
    }
  }

  initEventListeners() {
    this.el.addEventListener("pointerdown", this.handleClick.bind(this));
  }

  destroy() {
    this.el = null;
  }
}
