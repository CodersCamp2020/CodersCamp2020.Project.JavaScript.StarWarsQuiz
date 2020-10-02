export const QuizGameHumanUiPresenter = ({quizGame, quizGameView}) => {
  return {
    startGame() {
      quizGame.onTimesUp(() => quizGameView.showGameOver())
      quizGame.onTimerTick(({passedTime, tickMillis}) => quizGameView.showTimePass({passedTime, tickMillis}))
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
