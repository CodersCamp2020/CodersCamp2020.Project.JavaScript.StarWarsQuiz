export const QuizGameHumanUiPresenter = ({quizGame, quizGameView}) => {
  return {
    startGame() {
      quizGame.onTimesUp(() => console.log("TimesUp!"))
      quizGame.humanPlayer.onQuestionAsked(question => {
        quizGameView.showQuestion({question: question})
      })
      return quizGame.startGame();
    },
    giveAnswer({answer}) {
      return quizGame.humanPlayer.giveAnswer({player: 'human', answer})
    }
  }
}
