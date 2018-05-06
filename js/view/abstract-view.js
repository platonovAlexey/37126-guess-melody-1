import {stringToElement} from '../util';

export default class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return stringToElement(this.template);
  }

  bind() {

  }

}
