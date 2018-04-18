import {processUserAnswer} from "../data/game-data";
import {renderNextScreen} from '../util';
import ArtistView from '../view/artist-view';
import timer from '../timer';

const artist = (game, level) => {
  let answerTime = 0;
  const view = new ArtistView(game, level);
  view.onAnswer = (userAnswerStatus, currentState) => {
    const stateUpdate = processUserAnswer(userAnswerStatus, currentState, answerTime);
    renderNextScreen(stateUpdate);
  };
  timer.onTick = () => {
    view.data.time = timer.time;
    view.onTimerTick();
    answerTime++;
  };
  return view;
};

export default artist;
