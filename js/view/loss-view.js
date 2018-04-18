import AbstractView from './view';

export default class LossView extends AbstractView {
  constructor(content) {
    super();
    this.content = content;
  }
  get template() {
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">${this.content.heading}</h2>
      <div class="main-stat">${this.content.message}</div>
      <span role="button" tabindex="0" class="main-replay">${this.content.button}</span>
    </section>`.trim();
  }
  bind() {
    const replyButton = this.element.querySelector(`.main-replay`);
    replyButton.onclick = () => {
      this.onReplay();
    };
  }
  onReplay() {

  }
}
