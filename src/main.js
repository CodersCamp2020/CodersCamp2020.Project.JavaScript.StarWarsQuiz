import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "./GoogleVisionApi";
import {QuizGame} from "./QuizGame";
import {StarWarsPeopleApi} from "./StarWarsPeopleApi";
import {PeopleMode} from "./PeopleMode";
import {MainMenuView} from "./MainMenuView";
import {QuizGameHumanUiPresenter} from "./QuizGameHumanUiPresenter";
import {QuizGameView} from "./QuizGameView";
import {HumanPlayer} from "./HumanPlayer";
import {GoogleVisionPlayer} from "./GoogleVisionPlayer";
import {RealTimer} from "./RealTimer";
import {LocalStorageScoresRepository} from "./LocalStorageScoresRepository";

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
