import {InMemoryScoresRepository} from "../../../src/quiz-game/infrastructure/InMemoryScoresRepository";
import {QuizHallOfFamePresenter} from "../../../src/quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";

describe("Model-View-Presenter | Quiz Hall Of Fame", () => {

  const showBestScoresMock = jest.fn();
  const initialData = [
    {playerName: "Player1", score: 1}
  ]

  const sut = QuizHallOfFamePresenter({
    quizHallOfFameView: {
      showBestScores: showBestScoresMock
    },
    scoresRepository: InMemoryScoresRepository({modeName: "SampleModeName", initialData})
  })

  describe("loadBestScores", () => {

    sut.loadBestScores();

    it("should showBestScores on view", () => {
      expect(showBestScoresMock.calls.length).toEqual(1)
      expect(showBestScoresMock.calls[0][0]).toEqual(initialData)
    })

  })
})
