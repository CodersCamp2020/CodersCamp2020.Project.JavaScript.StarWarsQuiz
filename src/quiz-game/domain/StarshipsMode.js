import {AbstractMode} from "./AbstractMode";

const AVAILABLE_STARSHIP_IDS = [5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43, 47, 48];

function randomAnswerId() {
  return AVAILABLE_STARSHIP_IDS[Math.floor(Math.random() * AVAILABLE_STARSHIP_IDS.length)];
}

export const StarshipsMode = ({repository}) => AbstractMode({name: "starships", repository, randomAnswerId})
