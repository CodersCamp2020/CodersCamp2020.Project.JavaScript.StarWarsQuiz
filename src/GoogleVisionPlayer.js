export const GoogleVisionPlayer = ({googleVisionApi}) => {
  const onAnswerGivenHooks = []
  const player = {
    async askQuestion({question}) {
      const recognized = await googleVisionApi.recognizeImage({
        image: question.image
      }).then(result => result.value);
      onAnswerGivenHooks.forEach(hook => hook(recognized))
      return Promise.resolve();
    },
    onAnswerGiven(hook) {
      onAnswerGivenHooks.push(hook)
      return player;
    }
  }
  return player;
}
