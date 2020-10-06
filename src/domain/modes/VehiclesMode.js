import {AbstractMode} from "./AbstractMode";

const AVAILABLE_VEHICLE_IDS = [4, 6, 7, 8, 14, 16, 18, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42];

function randomAnswerId() {
  return AVAILABLE_VEHICLE_IDS[Math.floor(Math.random() * AVAILABLE_VEHICLE_IDS.length)];
}

export const VehiclesMode = ({repository, images}) => AbstractMode({
  name: "vehicles",
  repository,
  generateRandomAnswerId: randomAnswerId,
  images
})
