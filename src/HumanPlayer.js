export const HumanPlayer = ({playerName, quizGame}) => {
  const onQuestionHooks = []
  const player = {
    async askQuestion({question}) {
      onQuestionHooks.forEach(hook => hook(question))
      return Promise.resolve()
    },
    giveAnswer({answerName}) {
      quizGame.giveAnswer({player: playerName, answerName})
    },
    onQuestionAsked(hook) {
      onQuestionHooks.push(hook)
      return player;
    }
  }
  return player;
}
