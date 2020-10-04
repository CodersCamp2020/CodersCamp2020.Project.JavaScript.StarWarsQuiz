import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "./quiz-game/infrastructure/GoogleVisionApi";
import {QuizGame} from "./quiz-game/domain/QuizGame";
import {StarWarsPeopleApi} from "./quiz-game/infrastructure/StarWarsPeopleApi";
import {PeopleMode} from "./quiz-game/domain/PeopleMode";
import {MainMenuView} from "./main-menu/presentation/MainMenuView";
import {QuizGameHumanUiPresenter} from "./quiz-game/presentation/QuizGameHumanUiPresenter";
import {QuizGameView} from "./quiz-game/presentation/QuizGameView";
import {HumanPlayer} from "./quiz-game/domain/HumanPlayer";
import {GoogleVisionPlayer} from "./quiz-game/domain/GoogleVisionPlayer";
import {RealTimer} from "./quiz-game/infrastructure/RealTimer";
import {LocalStorageScoresRepository} from "./quiz-game/infrastructure/LocalStorageScoresRepository";

const API_KEY = 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'
const SW_API_BASE_URL = "https://swapi.dev/api";
//const SW_API_BASE_URL = "http://localhost:3000";


const starWarsPeopleApi = StarWarsPeopleApi({starWarsApiBaseUrl: SW_API_BASE_URL})
const googleVisionApi = GoogleVisionApi({apiKey: 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'})


MainMenuView()
    .onPlayTheGame(() => {
      const quizModeMenu = document.getElementById("swquiz-mode")
      quizModeMenu.style.display = 'none'
      const mode = PeopleMode({starWarsPeopleApi});
      const quizGame = QuizGame({
        mode,
        google: GoogleVisionPlayer({googleVisionApi}),
        human: HumanPlayer(),
        startTimer: ({tickMillis, timeout, onTick, onTimeout}) => RealTimer({tickMillis, timeout, onTick, onTimeout})
      })
      const quizGameView = QuizGameView({
        renderOn: '#swquiz-game',
        presenterSupplier: view => QuizGameHumanUiPresenter({
          quizGame,
          quizGameView: view,
          scoresRepository: LocalStorageScoresRepository({modeName: mode.name})
        })
      });
      quizGameView.show();
      quizGameView.startGame().then(() => console.log("GAME STARTED!"));
    })
