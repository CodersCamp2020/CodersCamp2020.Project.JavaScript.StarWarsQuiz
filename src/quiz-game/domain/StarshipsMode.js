import {getRandomIntInclusive} from "../../shared/Random";
import {imageBase64} from "../presentation/StarWarsAssetImage";

const AVAILABLE_STARSHIP_IDS = [5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43, 47, 48];

export const StarshipsMode = ({repository}) => {
  const modeName = "starships";
  return {
    name: modeName,
    async nextQuestion() {
      const starshipsIds = new Set()
      for (let i = 0; starshipsIds.size < 4; i++) {
        starshipsIds.add(AVAILABLE_STARSHIP_IDS[Math.floor(Math.random() * AVAILABLE_STARSHIP_IDS.length)])
      }
      const rightAnswerId = [...starshipsIds][getRandomIntInclusive(0, 3)]
      const answers = await Promise.all([...starshipsIds].map(id => repository.getById({id})));
      return {
        image: await imageBase64({type: modeName, id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}
