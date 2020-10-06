export const PartialMatchCheckStrategy = ({correctAnswer, givenAnswer}) => {
  const correctWords = correctAnswer.split(' ')
  const givenWords = givenAnswer.split(' ')
  return correctWords.some(r => givenWords.includes(r)) || givenWords.some(r => correctWords.includes(r));
}

export const ExactMatchCheckStrategy = ({correctAnswer, givenAnswer}) => correctAnswer === givenAnswer

export const IncludesCheckStrategy = ({correctAnswer, givenAnswer}) => {
  return correctAnswer.includes(givenAnswer);
}

export const AnswerChecker = ({checkStrategy}) => {
  return {
    isAnswerCorrect({correctAnswer, givenAnswer}) {
      return checkStrategy({correctAnswer, givenAnswer})
    }
  }
}
