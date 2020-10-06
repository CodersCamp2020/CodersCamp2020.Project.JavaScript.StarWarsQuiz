export const QuizHallOfFamePresenter = ({quizHallOfFameView, scoresRepository}) => {
  return {
    loadBestScores() {
      const bestScores = scoresRepository.findBestScores({max: 3})
      quizHallOfFameView.showBestScores({bestScores})
    }
  }
}
