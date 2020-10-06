import {InMemoryScoresRepository} from "../../../src/infrastructure/InMemoryScoresRepository";
import {QuizHallOfFamePresenter} from "../../../src/components/quiz-hall-of-fame/QuizHallOfFamePresenter";

describe("Model-View-Presenter | Quiz Hall Of Fame", () => {

  const showBestScoresMock = jest.fn();
  const initialData = [
    {playerName: "Player1", score: 1},
    {playerName: "Player2", score: 2},
    {playerName: "Player3", score: 3},
    {playerName: "Player4", score: 4}
  ]

  const sut = QuizHallOfFamePresenter({
    quizHallOfFameView: {
      showBestScores: showBestScoresMock
    },
    scoresRepository: InMemoryScoresRepository({modeName: "SampleModeName", initialData})
  })

  afterEach(() => {
    showBestScoresMock.mockClear();
  })

  describe("loadBestScores", () => {

    beforeEach(() => {
      sut.loadBestScores();
    })

    it("should showBestScores on view with 3 best scores, sorted from the best to the worst", () => {
      expect(showBestScoresMock.mock.calls.length).toEqual(1)
      expect(showBestScoresMock.mock.calls[0][0]).toEqual({
        bestScores: [
          {playerName: "Player4", score: 4},
          {playerName: "Player3", score: 3},
          {playerName: "Player2", score: 2}
        ]
      })
    })

  })
})
