import {getRandomIntInclusive} from "../../shared/Random";
import {imageBase64} from "../../components/quiz-game/StarWarsAssetImage";

export const AbstractMode = ({name, repository, randomAnswerId}) => {
  return {
    name,
    async nextQuestion() {
      const answersIds = new Set()
      for (let i = 0; answersIds.size < 4; i++) {
        answersIds.add(randomAnswerId())
      }
      const rightAnswerId = [...answersIds][getRandomIntInclusive(0, 3)]
      const answers = await Promise.all([...answersIds].map(id => repository.getById({id})));
      return {
        image: await imageBase64({type: name, id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}
