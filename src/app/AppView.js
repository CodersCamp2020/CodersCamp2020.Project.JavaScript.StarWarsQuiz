import {MainMenuView} from "../main-menu/presentation/MainMenuView";
import {ModeMenuView} from "../mode-menu/presentation/ModeMenuView";
import {QuizGame} from "../quiz-game/domain/QuizGame";
import {RealTimer} from "../quiz-game/infrastructure/RealTimer";
import {QuizGameView} from "../quiz-game/presentation/QuizGameView";
import {QuizGamePresenter} from "../quiz-game/presentation/QuizGamePresenter";
import {LocalStorageScoresRepository} from "../quiz-game/infrastructure/LocalStorageScoresRepository";
import {QuizHallOfFameView} from "../quiz-hall-of-fame/presentation/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "../quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";

const templateHtml = `
    <div class="swquiz-header">
        <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
        <div id="swquiz-mainmenu" class="swquiz-mainmenu">
        </div>
    </div>
    <div id="swquiz-mode" class="swquiz-mode">
        <div class="swquiz-question-image-bg"></div>
        <div style="width: 2rem"></div>
        <div id="swquiz-mode-menu" class="swquiz-mode-menu"></div>
    </div>

    <div id="swquiz-loading" class="swquiz-loading"><h1>FEEL THE FORCE...</h1></div>
    <div id="swquiz-game" class="swquiz-game"></div>
    <div id="swquiz-lightsaber" class="swquiz-lightsaber-wrapper"></div>
    <div id="swquiz-timer-text" class="swquiz-timer-text"></div>
`

export const AppView = ({renderOn, data}) => {
  const appView = document.querySelector(renderOn)
  appView.innerHTML = templateHtml;

  const {defaultModeName, humanPlayer, googleVisionPlayer, modes, modesDescriptions} = data;

  const view = {
    selectMode({modeName}) {

      ModeMenuView({
        renderOn: "#swquiz-mode-menu",
        data: {name: modeName, title: modesDescriptions[modeName].title, rules: modesDescriptions[modeName].rules}
      }).onClickPlayTheGameButton(modeName => {
        const quizModeMenu = document.getElementById("swquiz-mode")
        quizModeMenu.style.display = 'none'
        const quizGame = QuizGame({
          mode: modes[modeName],
          google: googleVisionPlayer,
          human: humanPlayer,
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


      return view;
    }
  }

  MainMenuView({
    renderOn: "#swquiz-mainmenu",
    options: ["people", "vehicles", "starships"],
    selectedOption: "people"
  }).onOptionSelected(({option}) => {
    view.selectMode({modeName: option})
  });
  view.selectMode({modeName: defaultModeName})
  return view;
}
