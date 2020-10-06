import {GoogleVisionApi} from "../infrastructure/GoogleVisionApi";
import {StarWarsApi} from "../infrastructure/StarWarsApi";
import {PeopleMode} from "../domain/modes/PeopleMode";
import {AppView} from "./AppView";
import {HumanPlayer} from "../domain/players/HumanPlayer";
import {GoogleVisionPlayer} from "../domain/players/GoogleVisionPlayer";
import {StarshipsMode} from "../domain/modes/StarshipsMode";
import {VehiclesMode} from "../domain/modes/VehiclesMode";
import {QuizGame} from "../domain/QuizGame";
import {RealTimer} from "../infrastructure/RealTimer";
import {LocalStorageScoresRepository} from "../infrastructure/LocalStorageScoresRepository";
import {ONE_SECOND_MILLIS} from "../shared/TimeUnits";
import {StaticImagesRepository} from "../infrastructure/StaticImagesRepository";

export const App = ({renderOn}) => {
  const GOOGLE_VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY || "AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk"
  const SW_API_BASE_URL = process.env.SW_API_BASE_URL || "https://swapi.dev/api";
  const QUIZ_MAX_TIME = process.env.QUIZ_MAX_TIME_SECONDS ? process.env.QUIZ_MAX_TIME_SECONDS * ONE_SECOND_MILLIS : 10 * ONE_SECOND_MILLIS;

  const starWarsApi = StarWarsApi({starWarsApiBaseUrl: SW_API_BASE_URL})
  const googleVisionApi = GoogleVisionApi({apiKey: GOOGLE_VISION_API_KEY})

  const staticImagesRepository = StaticImagesRepository()
  const swApiPeopleRepository = {
    getById({id}) {
      return starWarsApi.find({id, category: "people"})
    }
  }
  const swApiStarshipsRepository = {
    getById({id}) {
      return starWarsApi.find({id, category: "starships"})
    }
  }
  const swApiVehiclesRepository = {
    getById({id}) {
      return starWarsApi.find({id, category: "vehicles"})
    }
  }

  const googleVisionPlayer = GoogleVisionPlayer({googleVisionApi});
  const humanPlayer = HumanPlayer();

  const modes = {
    people: PeopleMode({repository: swApiPeopleRepository, images: staticImagesRepository}),
    vehicles: VehiclesMode({repository: swApiVehiclesRepository, images: staticImagesRepository}),
    starships: StarshipsMode({repository: swApiStarshipsRepository, images: staticImagesRepository}),
  };

  AppView({
    renderOn,
    quizMaxTime: QUIZ_MAX_TIME,
    quizGameProvider: ({modeName, quizMaxTime}) => QuizGame({
      mode: modes[modeName],
      quizMaxTime,
      google: googleVisionPlayer,
      human: humanPlayer,
      startTimer: ({tickMillis, timeout, onTick, onTimeout}) => RealTimer({tickMillis, timeout, onTick, onTimeout})
    }),
    scoresRepositoryProvider: (modeName) => LocalStorageScoresRepository({modeName}),
    data: {
      defaultModeName: "people",
      modesDescriptions: {
        people: {
          title: "Who is this character?",
          rules: `You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select who from Star Wars is showed on the left (Jar Jar Binks right now) from available options.`
        },
        vehicles: {
          title: "Do you recognize this vehicle?",
          rules: `You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which vehicle from Star Wars is showed on the left.`
        },
        starships: {
          title: "Do you recognize this starship?",
          rules: `You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which starship from Star Wars is showed on the left.`
        }
      }
    }
  });
}


