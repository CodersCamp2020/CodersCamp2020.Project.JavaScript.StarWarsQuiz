export const HumanPlayer = ({playerName, quizGame, onQuestionCallback}) => {
  let currentQuestion;
  return {
    async onQuestion({question}) {
      onQuestionCallback({question})
      return Promise.resolve()
    },
    giveAnswer({answerName}) {
      quizGame.giveAnswer({player: playerName, answerName})
    }
  }
}
