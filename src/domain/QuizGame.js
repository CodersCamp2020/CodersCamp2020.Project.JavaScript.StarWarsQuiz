import {AnswerChecker, PartialMatchCheckStrategy} from "./AnswerChecker";
import {ONE_SECOND_MILLIS} from "../shared/TimeUnits";

export const QuizGame = ({human, google, mode, quizMaxTime, startTimer, answerChecker}) => {
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
      questions[Object.keys(questions).length] = await mode.generateQuestion()
    }
  }

  async function askAllPlayers(question) {
    await Promise.all(
        Object.keys(players).map(async playerName => {
          const player = players[playerName]
          player.onAnswerGiven(answer => {
            game.giveAnswer({player: playerName, answer})
          })
          await player.askQuestion({question})
        })
    )
  }

  function startCountingTime() {
    startTimer({
      tickMillis: ONE_SECOND_MILLIS,
      timeout: quizMaxTime,
      onTick: ({passedTime, tickMillis}) => {
        onTimerTickHooks.forEach(hook => hook({passedTime, tickMillis}))
      },
      onTimeout: () => {
        onGameOverHooks.forEach(hook => hook(GameOver({questions, playersAnswers})))
      }
    })
  }

  const game = {
    humanPlayer: human,
    googlePlayer: google,
    async startGame() {
      await generateQuestions();
      const firstQuestion = questions[0];
      await askAllPlayers(firstQuestion);
      startCountingTime();
    },
    async giveAnswer({player, answer}) {
      const playerAnswers = playersAnswers[player];
      const questionIndex = Object.keys(playerAnswers).length;
      const answeredQuestion = questions[questionIndex];
      const isCorrect = answerChecker.isAnswerCorrect({correctAnswer: answeredQuestion.rightAnswer.name, givenAnswer: answer})
      playerAnswers[questionIndex] = {answerName: answer, isCorrect}
      const questionToAsk = questions[questionIndex];
      await players[player].askQuestion({question: questionToAsk})

      const questionsToAsk = Object.keys(questions).length;
      if (questionsToAsk - questionIndex <= 5) {
        await generateQuestions()
      }
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
