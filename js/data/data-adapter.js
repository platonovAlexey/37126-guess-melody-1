const preprocessAnswers = (answers, genre) => {
  return answers.map((it) => {
    if (genre) {
      return {
        src: it.src,
        correct: it.genre === genre
      };
    } else {
      return {
        image: it.image.url,
        artist: it.title,
        correct: it.isCorrect
      };
    }
  });
};

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default (data) => {
  return data.map((it) => ({
    type: it.type === QuestionType.ARTIST ? 1 : 0,
    question: it.question,
    src: it.src || null,
    answers: preprocessAnswers(it.answers, it.genre)
  }));
};
