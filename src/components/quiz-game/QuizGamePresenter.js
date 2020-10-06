export const QuizGamePresenter = ({quizGame, quizGameView, scoresRepository}) => {
  return {
    startGame() {
      quizGame.onGameOver((gameOver) => quizGameView.showGameOver(gameOver))
      quizGame.onTimerTick(({passedTime, tickMillis}) => quizGameView.showTimePass({passedTime, tickMillis}))
      quizGame.humanPlayer.onQuestionAsked(question => {
        quizGameView.showQuestion({question: question})
      })
      return quizGame.startGame();
    },
    giveAnswer({answer}) {
      return quizGame.humanPlayer.giveAnswer({player: 'human', answer})
    },
    saveScore({playerName, score}) {
      scoresRepository.saveScore({playerName, score})
    }
  }
}
