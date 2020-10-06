import {getRandomIntInclusive} from "../shared/Random";
import {AbstractMode} from "./AbstractMode";

const randomAnswerId = () => {
  const FIRST_PERSON_ID = 1;
  const LAST_PERSON_ID = 82;
  const random = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
  if (random === 17) {
    return randomAnswerId()
  }
  return random;
}

export const PeopleMode = ({repository}) => AbstractMode({name: "people", repository, randomAnswerId})
