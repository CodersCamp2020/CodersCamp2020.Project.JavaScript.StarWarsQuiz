export const HumanPlayer = () => {
  const onQuestionHooks = []
  const onAnswerGivenHooks = []
  const player = {
    async askQuestion({question}) {
      onQuestionHooks.forEach(hook => hook(question))
      return Promise.resolve()
    },
    onQuestionAsked(hook) {
      onQuestionHooks.push(hook)
      return player;
    },
    giveAnswer({answer}) {
      onAnswerGivenHooks.forEach(hook => hook(answer))
    },
    onAnswerGiven(hook) {
      onAnswerGivenHooks.push(hook)
      return player;
    }
  }
  return player;
}
