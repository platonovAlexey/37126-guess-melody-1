import {showScreen} from '../util';
import welcome from './welcome';
import LossView from "../view/loss-view";

const loss = (content) => {
  const view = new LossView(content);
  view.onReplay = () => {
    showScreen(welcome());
  };
  return view;
};

export default loss;
