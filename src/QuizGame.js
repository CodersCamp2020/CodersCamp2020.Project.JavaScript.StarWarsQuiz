import {AnswerChecker, PartialMatchCheckStrategy} from "./AnswerChecker";

const ONE_SECOND = 1000;

export const QuizGame = ({human, google, mode, startTimer}) => {
  const onTimesUpHooks = []
  const questions = {}
  const humanAnswers = {}
  const googleAnswers = {}

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
      const questionToAsk = questions[0];
      google.onAnswerGiven(recognizedName => {
        game.giveAnswer({player: 'google', answer: recognizedName})
      })
      await human.askQuestion({question: questionToAsk})
      await google.askQuestion({question: questionToAsk})
      const MAX_TIME = 20 * ONE_SECOND;
      startTimer({
        tickMillis: ONE_SECOND, timeout: MAX_TIME, onTimeout: () => {
          onTimesUpHooks.forEach(hook => hook())
        }
      })
    },
    async giveAnswer({player, answer}) {
      if (player === 'human') {
        const answeredQuestion = questions[Object.keys(humanAnswers).length];
        const isCorrect = answeredQuestion.rightAnswer.id === answer.id;
        humanAnswers[Object.keys(humanAnswers).length] = {answer, isCorrect}
        const questionToAsk = questions[Object.keys(humanAnswers).length];
        await human.askQuestion({question: questionToAsk})
      }
      if (player === 'google') {
        const answeredQuestion = questions[Object.keys(googleAnswers).length];
        const answerChecker = AnswerChecker({checkStrategy: PartialMatchCheckStrategy})
        const isCorrect = answerChecker.isAnswerCorrect({question: answeredQuestion, givenAnswer: answer})
        googleAnswers[Object.keys(googleAnswers).length] = {answerName: answer, isCorrect}
        const questionToAsk = questions[Object.keys(googleAnswers).length];
        await google.askQuestion({question: questionToAsk})
      }
      if (Object.keys(questions).length - Object.keys(humanAnswers).length <= 5 || Object.keys(questions).length - Object.keys(googleAnswers).length <= 5) {
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
