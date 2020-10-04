import {getRandomIntInclusive} from "../../shared/Random";
import {imageBase64} from "../presentation/StarWarsAssetImage";

const AVAILABLE_VEHICLE_IDS = [4, 6, 7, 8, 14, 16, 18, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42];

export const VehiclesMode = ({repository}) => {
  const modeName = "vehicles";
  return {
    name: modeName,
    async nextQuestion() {
      const answersIds = new Set()
      for (let i = 0; answersIds.size < 4; i++) {
        answersIds.add(AVAILABLE_VEHICLE_IDS[Math.floor(Math.random() * AVAILABLE_VEHICLE_IDS.length)])
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
