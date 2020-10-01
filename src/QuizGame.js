import {AnswerChecker, PartialMatchCheckStrategy} from "./AnswerChecker";

const ONE_SECOND = 1000;

export const QuizGame = ({human, google, mode, startTimer}) => {
  const onTimesUpHooks = []
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
      const MAX_TIME = 20 * ONE_SECOND;
      startTimer({
        tickMillis: ONE_SECOND, timeout: MAX_TIME, onTimeout: () => {
          onTimesUpHooks.forEach(hook => hook())
        }
      })
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
    onTimesUp(hook) {
      onTimesUpHooks.push(hook)
      return game;
    }
  };
  return game
}
