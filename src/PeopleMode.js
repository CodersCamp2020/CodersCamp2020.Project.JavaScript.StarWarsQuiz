import {getRandomIntInclusive} from "./Random";
import {imageOf} from "./StarWarsAssetImage";

const randomPersonId = () => {
  const FIRST_PERSON_ID = 1;
  const LAST_PERSON_ID = 82;
  const random = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
  if (random === 17) {
    return randomPersonId()
  }
  return random;
}

export const PeopleMode = ({starWarsPeopleApi}) => {
  return {
    name: "people",
    async nextQuestion() {
      const peopleIds = new Set()
      for (let i = 0; peopleIds.size < 4; i++) {
        peopleIds.add(randomPersonId())
      }
      const rightAnswerId = [...peopleIds][getRandomIntInclusive(0, 3)]
      const answers = await Promise.all([...peopleIds].map(id => starWarsPeopleApi.getById({id})));
      return {
        image: await imageOf({type: "people", id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}
