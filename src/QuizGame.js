const ONE_SECOND = 1000;

export const QuizGame = ({humanProvider, googleProvider, mode}) => {
  const human = humanProvider(this)
  const google = googleProvider(this)
  const onTimesUpHooks = []
  const questions = []
  const humanAnswers = {}
  const googleAnswers = []
  return {
    humanPlayer: human,
    googlePlayer: google,
    async startGame() {
      const MAX_TIME = 10 * ONE_SECOND;
      let passedTime = 0;
      const timer = setInterval(() => {
        console.log("ONE SECOND")
        passedTime += ONE_SECOND;
        if (passedTime === MAX_TIME) {
          onTimesUpHooks.forEach(hook => hook())
        }
      }, ONE_SECOND)
      clearInterval(timer)
      const fetchedQuestions = await Promise.all([mode.nextQuestion(), mode.nextQuestion(), mode.nextQuestion()])
      questions.push(...fetchedQuestions)
      const questionToAsk = questions[0];
      console.log("QUESTION TO ASK", questionToAsk)
      await human.askQuestion({question: questionToAsk})
    },
    giveAnswer({player, answer}) {
      if (player === 'human') {
        humanAnswers[Object.keys(humanAnswers).length] = answer
      }
      if (player === 'google') {
        googleAnswers.push(answer)
      }
      console.log(humanAnswers)
    },
    onTimesUp(hook) {
      onTimesUpHooks.push(hook)
    }
  }
}
