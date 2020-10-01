const ONE_SECOND = 1000;

export const QuizGame = ({humanProvider, googleProvider, mode}) => {
  const human = humanProvider(this)
  const google = googleProvider(this)
  const onTimesUpHooks = []
  return {
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
      const question = await mode.nextQuestion()
    },
    giveAnswer({player, answerName}) {

    },
    onTimesUp(hook) {
      onTimesUpHooks.push(hook)
    }
  }
}
