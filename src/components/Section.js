export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /** передаю массив аргументом, чтобы метод был переиспользуемым */
  renderItems(renderedItems) {
    renderedItems.reverse().forEach(item => this._renderer(item))
  }
  /** данный метод позволяет избавиться от дублирования кода при рендере новой карточки */
  renderNewItem(item) {
    this._renderer(item);
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
