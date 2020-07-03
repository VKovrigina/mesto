export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }
  //к каждому элементу массива применяет переданную функцию
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }
  //вставляет элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
