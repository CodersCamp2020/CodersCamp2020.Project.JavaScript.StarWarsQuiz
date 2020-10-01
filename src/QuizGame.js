const ONE_SECOND = 1000;

export const QuizGame = ({humanProvider, googleProvider, mode}) => {
  const human = humanProvider(this)
  const google = googleProvider(this)
  const onTimesUpHooks = []
  const questions = {}
  const humanAnswers = {}
  const googleAnswers = {}

  async function generateQuestions() {
    const fetchedQuestions = await Promise.all([mode.nextQuestion(), mode.nextQuestion(), mode.nextQuestion(), mode.nextQuestion()])
    fetchedQuestions.forEach(question => {
      questions[Object.keys(questions).length] = question
    })
  }

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
      await generateQuestions();
      const questionToAsk = questions[0];
      await human.askQuestion({question: questionToAsk})
    },
    async giveAnswer({player, answer}) {
      if (player === 'human') {
        humanAnswers[Object.keys(humanAnswers).length] = answer
        const questionToAsk = questions[Object.keys(humanAnswers).length];
        await human.askQuestion({question: questionToAsk})
      }
      if (player === 'google') {
        googleAnswers.push(answer)
      }
      console.log(humanAnswers)
      return Promise.resolve()
    },
    onTimesUp(hook) {
      onTimesUpHooks.push(hook)
    }
  }
}
