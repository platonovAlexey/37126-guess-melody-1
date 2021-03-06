const QUESTIONS_TOTAL = 10;
const FAST_ANSWER_TIME = 30;
const GAME_INCOMPLETE = -1;
const Answer = {
  WRONG: -2,
  CORRECT: 1,
  FAST: 2
};

export const TIME_TOTAL = 300;
export const ALARM_TIME = 30;
export const MISTAKES_ALLOWED = 2;
export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};
export const SCREENS = {
  welcome: {
    rules: {
      heading: `Правила игры`,
      text: `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!`
    }
  },
  timeout: {
    heading: `Увы и ах!`,
    message: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    button: `Попробовать ещё раз`
  },
  attempts: {
    heading: `Какая жалость!`,
    message: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    button: `Попробовать ещё раз`
  },
  winner: {
    heading: `Вы настоящий меломан!`,
    button: `Сыграть ещё раз`
  },
  loader: {
    heading: `Пожалуйста подождите`,
    message: `Приложение загружает данные...`,
    button: ``
  }
};

export const initialState = {
  time: TIME_TOTAL,
  mistakes: 0,
  currentLevel: 0,
  userAnswers: []
};

export const getScore = (answers) => {
  if (answers.length !== QUESTIONS_TOTAL) {
    return GAME_INCOMPLETE;
  }

  return answers.reduce((sum, el) => {
    if (!el.correct) {
      sum += Answer.WRONG;
    } else {
      sum += el.time < FAST_ANSWER_TIME ? Answer.FAST : Answer.CORRECT;
    }
    return sum;
  }, 0);
};

export const getMessage = (leaders, player) => {
  let message;
  const playerScore = player.score;
  const stats = [...leaders, playerScore].sort((a, b) => a - b);
  const totalPlayers = stats.length;
  const currentIndex = stats.indexOf(playerScore);
  const place = totalPlayers - currentIndex;
  const percent = ((currentIndex / totalPlayers) * 100).toFixed();
  message = `Вы заняли ${place} место из ${totalPlayers} игроков. Это лучше чем у ${percent}% игроков`;
  return message;
};

export const processUserAnswer = (answer, data, time) => {
  const dataUpdate = JSON.parse(JSON.stringify(data));
  if (!answer) {
    dataUpdate.mistakes++;
  }
  dataUpdate.currentLevel++;
  dataUpdate.userAnswers.push({
    correct: answer,
    time
  });
  if (dataUpdate.userAnswers.length === QUESTIONS_TOTAL) {
    dataUpdate.isComplete = true;
  }
  return dataUpdate;
};

export const getFastAnswers = (arr) => {
  return arr.filter(({time}) => time < FAST_ANSWER_TIME).length;
};

export const isSelectedCorrect = (arr) => {
  return arr.every((it) => {
    return it.checked.toString() === it.value;
  });
};
