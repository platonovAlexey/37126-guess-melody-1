const preprocessAnswers = (answers, genre) => {
  return answers.map((it) => {
    if (genre) {
      return {
        src: it.src,
        correct: it.genre === genre
      };
    }
    return {
      image: it.image.url,
      artist: it.title,
      correct: it.isCorrect
    };
  });
};

export default (data) => {
  return data.map((it) => ({
    type: it.type,
    question: it.question,
    src: it.src || null,
    answers: preprocessAnswers(it.answers, it.genre)
  }));
};
