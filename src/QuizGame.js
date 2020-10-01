import {AnswerChecker, PartialMatchCheckStrategy} from "./AnswerChecker";

const ONE_SECOND = 1000;

export const QuizGame = ({human, google, mode}) => {
  const onTimesUpHooks = []
  const questions = {}
  const humanAnswers = {}
  const googleAnswers = {}

  async function generateQuestions(next = 10) {
    for(let i = 0; i < next; i++){
      questions[Object.keys(questions).length] = await mode.nextQuestion()
    }
  }

  const game = {
    humanPlayer: human,
    googlePlayer: google,
    async startGame() {
      const MAX_TIME = 10 * ONE_SECOND;
      let passedTime = 0;
      const timer = setInterval(() => {
        passedTime += ONE_SECOND;
        if (passedTime === MAX_TIME) {
          onTimesUpHooks.forEach(hook => hook())
          clearInterval(timer)
        }
      }, ONE_SECOND)
      await generateQuestions();
      const questionToAsk = questions[0];
      google.onAnswerGiven(recognizedName => {
        game.giveAnswer({player: 'google', answer: recognizedName})
      })
      await human.askQuestion({question: questionToAsk})
      await google.askQuestion({question: questionToAsk})
    },
    async giveAnswer({player, answer}) {
      if (player === 'human') {
        humanAnswers[Object.keys(humanAnswers).length] = answer
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
