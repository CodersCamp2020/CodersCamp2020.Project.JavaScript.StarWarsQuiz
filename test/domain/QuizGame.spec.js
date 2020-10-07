import {QuizGame} from "../../src/domain/QuizGame";
import {GoogleVisionPlayer} from "../../src/domain/players/GoogleVisionPlayer";
import {HumanPlayer} from "../../src/domain/players/HumanPlayer";
import {PeopleMode} from "../../src/domain/modes/PeopleMode";
import {RealTimer} from "../../src/infrastructure/RealTimer";
import * as Random from "../../src/shared/Random";
import {getRandomIntInclusive} from "../../src/shared/Random";
import {AnswerChecker, PartialMatchCheckStrategy} from "../../src/domain/AnswerChecker";
import {FakeTimer} from "../../src/infrastructure/FakeTimer";

describe("QuizGame", () => {

  const googleVisionApiResponse = "Luke Skywalker"
  const recognizeImageMockFn = jest.fn().mockReturnValue(googleVisionApiResponse)

  const humanPlayer = HumanPlayer();
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
  let humanPlayerAskQuestionSpy;
  let googlePlayerAskQuestionSpy;
  let timer;

  beforeEach(() => {
    quizGame = QuizGame({
      human: humanPlayer,
      google: googleVisionPlayer,
      mode: peopleMode,
      answerChecker: AnswerChecker({checkStrategy: PartialMatchCheckStrategy}),
      quizMaxTime: 3 * 1000,
      startTimer: ({tickMillis, timeout, onTick, onTimeout}) => {
        const fakeTimer = FakeTimer({
          tickMillis,
          timeoutMillis: timeout,
          onTick,
          onTimeout
        })
        timer = fakeTimer;
        return fakeTimer;
      }
    });
    humanPlayerAskQuestionSpy = jest.spyOn(humanPlayer, "askQuestion");
    googlePlayerAskQuestionSpy = jest.spyOn(googleVisionPlayer, "askQuestion");

    jest.spyOn(Random, 'getRandomIntInclusive')
        .mockImplementation(() => {
          const array = [1, 2, 3, 4];
          return array[Math.floor(Math.random() * array.length)]
        })
  })

  afterEach(() => {
    jest.spyOn(Random, 'getRandomIntInclusive').mockRestore();
  })

  describe("when start the game", () => {

    beforeEach(async (done) => {
      await quizGame.startGame();
      done()
    })

    it("human player should be asked to answer first question", () => {
      expect(humanPlayerAskQuestionSpy).toBeCalled()
    })

    it("google vision player should be asked to answer first question", () => {
      expect(googlePlayerAskQuestionSpy).toBeCalled()
    })

    describe("when human give answer", () => {

      const humanPlayerNextQuestionHook = jest.fn();

      beforeEach(async (done)=>{
        humanPlayer.onQuestionAsked(humanPlayerNextQuestionHook)
        await quizGame.giveAnswer({player: "human", answer: "answer"})
        done()
      })

      it("then should be asked for next question", () => {
        expect(humanPlayerNextQuestionHook).toBeCalledTimes(1)
      })

    })

  })

  describe("when started game reached timeout", () => {

    const gameOverHook = jest.fn();
    const timerTickHook = jest.fn();

    beforeEach(async (done) => {
      quizGame.onGameOver(gameOverHook)
      quizGame.onTimerTick(timerTickHook)
      await quizGame.startGame();
      timer.tick()
      timer.tick()
      timer.tick()
      done()
    })

    it("then on timer tick hook should be notified", () => {
      expect(timerTickHook).toBeCalledTimes(3)
    })

    it("then game over hook should be notified", () => {
      expect(gameOverHook).toBeCalled()
    })

  })


})

const anImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

