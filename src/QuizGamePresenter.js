export const QuizGamePresenter = ({quizGame, quizGameView}) => {
  return {
    startGame() {
      quizGame.onTimesUp(() => console.log("TimesUp!"))
      quizGame.humanPlayer.onQuestionAsked(question => {
        quizGameView.showQuestion({question: question})
      })
      return quizGame.startGame();
    },
    giveAnswer({player, answer}) {
      return quizGame.giveAnswer({player, answer})
    }
  }
}
