import {getRandomIntInclusive} from "../../shared/Random";
import {imageBase64} from "../presentation/StarWarsAssetImage";

const randomPersonId = () => {
  const FIRST_PERSON_ID = 1;
  const LAST_PERSON_ID = 82;
  const random = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
  if (random === 17) {
    return randomPersonId()
  }
  return random;
}

export const PeopleMode = ({repository}) => {
  const modeName = "people";
  return {
    name: modeName,
    async nextQuestion() {
      const answersIds = new Set()
      for (let i = 0; answersIds.size < 4; i++) {
        answersIds.add(randomPersonId())
      }
      const rightAnswerId = [...answersIds][getRandomIntInclusive(0, 4)]
      const answers = await Promise.all([...answersIds].map(id => repository.getById({id})));
      return {
        image: await imageBase64({type: modeName, id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}
