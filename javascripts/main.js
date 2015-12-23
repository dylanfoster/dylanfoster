function makeArray(args) {
  return Array.from(args);
}

class EventedElement {
  constructor(element) {
    this.element = element;
  }

  addClass(className) {
    return this.element.classList.add(className);
  }

  addEvent(event, handler) {
    return this.element.addEventListener(event, handler);
  }

  find(el) {
    return new EventedElement(this.element.querySelector(el));
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }
}

class Modal extends EventedElement {
  constructor(element) {
    super(element);
    this.addEvent("click", this.destroy.bind(this));
    this.container = this.find(".modal__content");
    this.closeButton = this.find(".modal__close");
    this.render();
    this.closeButton.addEvent("click", (e) => this.destroy());
  }

  destroy() {
    this.addClass("hidden");
    this.container.removeClass("show");
  }

  render() {
    this.removeClass("hidden");
    this.container.addClass("show");
  }

  static create(element) {
    return new Modal(element);
  }
}

let modalToggles = makeArray(document.querySelectorAll(".tile"));

modalToggles.forEach(tile => {
  tile.addEventListener("click", function () {
    let target = tile.dataset.toggle;
    Modal.create(document.querySelector(target));
  });
});
