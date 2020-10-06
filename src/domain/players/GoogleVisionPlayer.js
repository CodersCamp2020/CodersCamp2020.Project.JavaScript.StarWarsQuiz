export const GoogleVisionPlayer = ({googleVisionApi}) => {
  const onAnswerGivenHooks = []
  const player = {
    async askQuestion({question}) {
      const recognized = await googleVisionApi.recognizeImage({
        image: question.image
      });
      this.giveAnswer({answer: recognized})
      return Promise.resolve();
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
