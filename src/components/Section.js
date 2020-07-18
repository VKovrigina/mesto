export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  //к каждому элементу массива применяет переданную функцию
  renderItems(renderedItems) {
    renderedItems.reverse().forEach(item => this._renderer(item))
  }

  renderNewItem(item) {
    this._renderer(item);
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
