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

  const modes = {
    people: PeopleMode({repository: swApiPeopleRepository}),
    vehicles: VehiclesMode({repository: swApiVehiclesRepository}),
    starships: StarshipsMode({repository: swApiStarshipsRepository}),
  };

  MainMenuView({
    defaultModeName: "people",
    modes: {
      people: {
        title: "Who is this character?",
        rules: `You have two minutes (2m) to answer as many questions as possible. During the game on each question
                    you need to select who from Star Wars is showed on the left (Jar Jar Binks right now) from available
                    options, or select that the character is none of above.`
      },
      vehicles: {
        title: "Do you recognize this vehicle?",
        rules: `Guess vehicle`
      },
      starships: {
        title: "Do you recognize this starship?",
        rules: `Guess starship`
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
        quizGameView.startGame().then(() => console.log("GAME STARTED!"));
      })
      .onClickHallOfFameButton(modeName => {
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


