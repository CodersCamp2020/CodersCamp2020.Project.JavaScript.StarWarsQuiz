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

const templateHtml = `
    <div class="swquiz-header">
        <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
        <div class="swquiz-mainmenu">
            <p class="swquiz-mainmenu-option" id="people">People</p>
            <p class="swquiz-mainmenu-option" id="vehicles">Vehicles</p>
            <p class="swquiz-mainmenu-option" id="starships">Starships</p>
        </div>
    </div>
    <div id="swquiz-mode" class="swquiz-mode">
        <div class="swquiz-question-image-bg"></div>
        <div style="width: 2rem"></div>
        <div id="swquiz-mode-menu" class="swquiz-mode-menu">
            <div class="swquiz-mode-title"><p id="swquiz-mode-title-text">MODE: Who is this character?</p></div>
            <div id="swquiz-mode-content" class="swquiz-mode-content">
                <h2>Mode Rules</h2>
                <p id="swquiz-mode-rules-text"></p>
            </div>
            <div class="sw-quiz-mode-buttons">
                <button id="swquiz-mode-hall-of-fame-button" class="sw-quiz-mode-button-secondary">Hall of fame</button>
                <div style="width: 2rem"></div>
                <button class="sw-quiz-mode-button-play" id="play-the-game-button">PLAY THE GAME</button>
            </div>
        </div>
    </div>


    <div id="swquiz-loading" class="swquiz-loading"><h1>FEEL THE FORCE...</h1></div>
    <div id="swquiz-game" class="swquiz-game"></div>
    <div id="swquiz-lightsaber" class="swquiz-lightsaber-wrapper"></div>
    <div id="swquiz-timer-text" class="swquiz-timer-text"></div>


    <div id="swquiz-game-result-modal" class="swquiz-game-result-modal"></div>
`

export const App = ({renderOn}) => {
  const API_KEY = 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'
  const SW_API_BASE_URL = "https://swapi.dev/api";
//const SW_API_BASE_URL = "http://localhost:3000";

  const appElement = document.querySelector(renderOn)
  appElement.innerHTML = templateHtml;

  const starWarsApi = StarWarsApi({starWarsApiBaseUrl: SW_API_BASE_URL})
  const googleVisionApi = GoogleVisionApi({apiKey: API_KEY})

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
        rules: `You have two minutes (2m) to answer as many questions as possible. During the game on each question you need to select who from Star Wars is showed on the left (Jar Jar Binks right now) from available options.`
      },
      vehicles: {
        title: "Do you recognize this vehicle?",
        rules: `You have two minutes (2m) to answer as many questions as possible. During the game on each question you need to select which vehicle from Star Wars is showed on the left.`
      },
      starships: {
        title: "Do you recognize this starship?",
        rules: `You have two minutes (2m) to answer as many questions as possible. During the game on each question you need to select which starship from Star Wars is showed on the left.`
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


