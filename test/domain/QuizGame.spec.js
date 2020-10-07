import {QuizGame} from "../../src/domain/QuizGame";
import {GoogleVisionPlayer} from "../../src/domain/players/GoogleVisionPlayer";
import {HumanPlayer} from "../../src/domain/players/HumanPlayer";
import {PeopleMode} from "../../src/domain/modes/PeopleMode";
import {RealTimer} from "../../src/infrastructure/RealTimer";

describe("QuizGame", () => {

  const googleVisionApiResponse = "Luke Skywalker"
  const recognizeImageMockFn = jest.fn().mockReturnValue(googleVisionApiResponse)

  const googleVisionPlayer = GoogleVisionPlayer({
    googleVisionApi: {
      recognizeImage: recognizeImageMockFn
    }
  });

  const peopleMode = PeopleMode({
    repository: {
      getById: jest.fn().mockImplementation(({id}) => {
        switch (id) {
          case 1:
            return {id, name: "Luke Skywalker"}
          case 2:
            return {id, name: "C-3PO"}
          case 3:
            return {id, name: "R2-D2"}
          case 4:
            return {id, name: "Darth Vader"}
        }
      })
    },
    images: {
      find: jest.fn().mockImplementation(() => anImage)
    }
  })

  let quizGame;
  beforeEach(() => {
    quizGame = QuizGame({
      human: HumanPlayer(),
      google: googleVisionPlayer,
      mode: peopleMode,
      quizMaxTime: 120,
      startTimer: ({tickMillis, timeout, onTick, onTimeout}) => RealTimer({
        tickMillis,
        timeoutMillis: timeout,
        onTick,
        onTimeout
      })
    });
  })

  describe("starting the game", () => {

    beforeEach(() => {
      quizGame.startGame();
    })

    it("s", () => {
      quizGame.startGame();
    })
  })


})

const anImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

