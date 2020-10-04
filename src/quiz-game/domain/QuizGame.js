import {AnswerChecker, PartialMatchCheckStrategy} from "./AnswerChecker";
import {ONE_SECOND_MILLIS, QUIZ_MAX_TIME} from "./TimeUnits";

//TODO: Change times up to game over!

export const QuizGame = ({human, google, mode, startTimer}) => {
  const onGameOverHooks = []
  const onTimerTickHooks = []
  const questions = {}
  const players = {
    human,
    google
  }
  const playersAnswers = {
    human: {},
    google: {}
  }

  async function generateQuestions(next = 10) {
    for (let i = 0; i < next; i++) {
      questions[Object.keys(questions).length] = await mode.nextQuestion()
    }
  }

  const game = {
    humanPlayer: human,
    googlePlayer: google,
    async startGame() {
      await generateQuestions();
      const firstQuestion = questions[0];
      await Promise.all(
          Object.keys(players).map(async playerName => {
            const player = players[playerName]
            player.onAnswerGiven(answer => {
              game.giveAnswer({player: playerName, answer})
            })
            await player.askQuestion({question: firstQuestion})
          })
      )
      startTimer({
        tickMillis: ONE_SECOND_MILLIS,
        timeout: QUIZ_MAX_TIME,
        onTick: ({passedTime, tickMillis}) => {
          onTimerTickHooks.forEach(hook => hook({passedTime, tickMillis}))
        },
        onTimeout: () => {
          onGameOverHooks.forEach(hook => hook(GameOver({questions, playersAnswers})))
        }
      })
      return Promise.resolve()
    },
    async giveAnswer({player, answer}) {
      const answeredQuestion = questions[Object.keys(playersAnswers[player]).length];
      const answerChecker = AnswerChecker({checkStrategy: PartialMatchCheckStrategy})
      const isCorrect = answerChecker.isAnswerCorrect({question: answeredQuestion, givenAnswer: answer})
      playersAnswers[player][Object.keys(playersAnswers[player]).length] = {answerName: answer, isCorrect}
      const questionToAsk = questions[Object.keys(playersAnswers[player]).length];
      await players[player].askQuestion({question: questionToAsk})

      if (Object.keys(questions).length - Object.keys(playersAnswers[player]).length <= 5) {
        await generateQuestions()
      }
      return Promise.resolve()
    },
    onGameOver(hook) {
      onGameOverHooks.push(hook)
      return game;
    },
    onTimerTick(hook) {
      onTimerTickHooks.push(hook)
      return game;
    }
  };
  return game
}

function GameOver({questions, playersAnswers}) {
  const answerList = Object.values(questions).slice(0, Math.max(Object.keys(playersAnswers.human).length, Object.keys(playersAnswers.google).length))
      .map((question, index) => {
        const googleAnswer = playersAnswers.google[index];
        const humanAnswer = playersAnswers.human[index];
        let answers = {
          image: question.image,
          correctAnswerName: question.rightAnswer.name
        }
        if (googleAnswer) {
          answers = {
            ...answers, googleAnswer: {
              answerName: googleAnswer.answerName,
              isCorrect: googleAnswer.isCorrect
            }
          }
        }
        if (humanAnswer) {
          answers = {
            ...answers, humanAnswer: {
              answerName: humanAnswer.answerName,
              isCorrect: humanAnswer.isCorrect
            }
          }
        }
        return answers;
      })
  return {answers: answerList}
}
