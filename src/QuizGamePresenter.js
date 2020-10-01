export const QuizGamePresenter = ({quizGame, quizGameView}) => {
  return {
    startGame() {
      quizGame.onTimesUp(() => console.log("TimesUp!"))
      return quizGame.startGame();
    }
  }
}
