export const GoogleVisionPlayer = ({playerName, quizGame, googleVisionApi}) => {
  return {
    async onQuestion({question}) {
      const recognized = await googleVisionApi.recognizeImage({
        image: question.image
      }).then(result => result.value);
      return quizGame.giveAnswer({player: playerName, answerName: recognized})
    }
  }
}
