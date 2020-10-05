import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "../quiz-game/infrastructure/GoogleVisionApi";
import {QuizGame} from "../quiz-game/domain/QuizGame";
import {StarWarsApi} from "../quiz-game/infrastructure/StarWarsApi";
import {PeopleMode} from "../quiz-game/domain/PeopleMode";
import {AppView} from "./AppView";
import {QuizGamePresenter} from "../quiz-game/presentation/QuizGamePresenter";
import {QuizGameView} from "../quiz-game/presentation/QuizGameView";
import {HumanPlayer} from "../quiz-game/domain/HumanPlayer";
import {GoogleVisionPlayer} from "../quiz-game/domain/GoogleVisionPlayer";
import {RealTimer} from "../quiz-game/infrastructure/RealTimer";
import {LocalStorageScoresRepository} from "../quiz-game/infrastructure/LocalStorageScoresRepository";
import {QuizHallOfFameView} from "../quiz-hall-of-fame/presentation/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "../quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";
import {StarshipsMode} from "../quiz-game/domain/StarshipsMode";
import {VehiclesMode} from "../quiz-game/domain/VehiclesMode";

export const App = ({renderOn}) => {
  const GOOGLE_VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY || "AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk"
  const SW_API_BASE_URL = process.env.SW_API_BASE_URL || "https://swapi.dev/api";

  const starWarsApi = StarWarsApi({starWarsApiBaseUrl: SW_API_BASE_URL})
  const googleVisionApi = GoogleVisionApi({apiKey: GOOGLE_VISION_API_KEY})

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

  const modes = {
    people: PeopleMode({repository: swApiPeopleRepository}),
    vehicles: VehiclesMode({repository: swApiVehiclesRepository}),
    starships: StarshipsMode({repository: swApiStarshipsRepository}),
  };

  AppView({
    renderOn,
    defaultModeName: "people",
    modes: {
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
  })
      .onClickPlayTheGameButton(modeName => {
        const quizModeMenu = document.getElementById("swquiz-mode")
        quizModeMenu.style.display = 'none'
        const quizGame = QuizGame({
          mode: modes[modeName],
          google: GoogleVisionPlayer({googleVisionApi}),
          human: HumanPlayer(),
          startTimer: ({tickMillis, timeout, onTick, onTimeout}) => RealTimer({tickMillis, timeout, onTick, onTimeout})
        })
        const quizGameView = QuizGameView({
          renderOn: '#swquiz-game',
          presenterSupplier: view => QuizGamePresenter({
            quizGame,
            quizGameView: view,
            scoresRepository: LocalStorageScoresRepository({modeName})
          })
        });
        quizGameView.show();
        quizGameView.startGame()
            .then(() => console.log("GAME STARTED!"));
      })
      .onClickHallOfFameButton(modeName => {
        console.log("CLICK HALL OF FAME", modeName)
        const quizHallOfFameView = QuizHallOfFameView({
          renderOn: "#swquiz-mode-content",
          presenterSupplier: view => QuizHallOfFamePresenter({
            scoresRepository: LocalStorageScoresRepository({modeName}),
            quizHallOfFameView: view
          })
        });
        quizHallOfFameView.loadBestScores();
      });
}


