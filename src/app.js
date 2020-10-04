import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "./quiz-game/infrastructure/GoogleVisionApi";
import {QuizGame} from "./quiz-game/domain/QuizGame";
import {StarWarsApi} from "./quiz-game/infrastructure/StarWarsApi";
import {PeopleMode} from "./quiz-game/domain/PeopleMode";
import {MainMenuView} from "./main-menu/presentation/MainMenuView";
import {QuizGamePresenter} from "./quiz-game/presentation/QuizGamePresenter";
import {QuizGameView} from "./quiz-game/presentation/QuizGameView";
import {HumanPlayer} from "./quiz-game/domain/HumanPlayer";
import {GoogleVisionPlayer} from "./quiz-game/domain/GoogleVisionPlayer";
import {RealTimer} from "./quiz-game/infrastructure/RealTimer";
import {LocalStorageScoresRepository} from "./quiz-game/infrastructure/LocalStorageScoresRepository";
import {QuizHallOfFameView} from "./quiz-hall-of-fame/presentation/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "./quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";
import {StarshipsMode} from "./quiz-game/domain/StarshipsMode";
import {VehiclesMode} from "./quiz-game/domain/VehiclesMode";

export const App = () => {
  const API_KEY = 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'
  const SW_API_BASE_URL = "https://swapi.dev/api";
//const SW_API_BASE_URL = "http://localhost:3000";


  const starWarsApi = StarWarsApi({starWarsApiBaseUrl: SW_API_BASE_URL})
  const googleVisionApi = GoogleVisionApi({apiKey: 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'})


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

  //const mode = StarshipsMode({repository: swApiStarshipsRepository});
  //const mode = VehiclesMode({repository: swApiVehiclesRepository});

  const mode = PeopleMode({repository: swApiPeopleRepository});


  const scoresRepository = LocalStorageScoresRepository({modeName: mode.name})
  MainMenuView()
      .onClickPlayTheGameButton(() => {
        const quizModeMenu = document.getElementById("swquiz-mode")
        quizModeMenu.style.display = 'none'
        const quizGame = QuizGame({
          mode,
          google: GoogleVisionPlayer({googleVisionApi}),
          human: HumanPlayer(),
          startTimer: ({tickMillis, timeout, onTick, onTimeout}) => RealTimer({tickMillis, timeout, onTick, onTimeout})
        })
        const quizGameView = QuizGameView({
          renderOn: '#swquiz-game',
          presenterSupplier: view => QuizGamePresenter({
            quizGame,
            quizGameView: view,
            scoresRepository
          })
        });
        quizGameView.show();
        quizGameView.startGame().then(() => console.log("GAME STARTED!"));
      })
      .onClickHallOfFameButton(() => {
        const quizHallOfFameView = QuizHallOfFameView({
          renderOn: "#swquiz-mode-content",
          presenterSupplier: view => QuizHallOfFamePresenter({
            scoresRepository,
            quizHallOfFameView: view
          })
        });
        quizHallOfFameView.loadBestScores();
      })
}


