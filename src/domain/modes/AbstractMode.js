import {getRandomIntInclusive} from "../../shared/Random";

export const AbstractMode = ({name, repository, generateRandomAnswerId, images}) => {
  return {
    name,
    async generateQuestion() {
      const answersIds = new Set()
      for (let i = 0; answersIds.size < 4; i++) {
        answersIds.add(generateRandomAnswerId())
      }
      const rightAnswerId = [...answersIds][getRandomIntInclusive(0, 3)]
      const answers = await Promise.all([...answersIds].map(id => repository.getById({id})));
      return {
        image: await images.find({type: name, id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}
