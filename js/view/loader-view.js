import LossView from './loss-view';

export default class LoaderView extends LossView {
  bind() {
    const retryButton = this.element.querySelector(`.main-replay`);
    retryButton.onclick = () => {
      this.onRetry();
    };
  }
  onRetry() {

  }
}
