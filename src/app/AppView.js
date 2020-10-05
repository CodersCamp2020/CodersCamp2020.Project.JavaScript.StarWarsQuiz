import {MainMenuView} from "../main-menu/presentation/MainMenuView";
import {ModeMenuView} from "../mode-menu/presentation/ModeMenuView";
import {QuizGameView} from "../quiz-game/presentation/QuizGameView";
import {QuizGamePresenter} from "../quiz-game/presentation/QuizGamePresenter";
import {QuizHallOfFameView} from "../quiz-hall-of-fame/presentation/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "../quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";

const templateHtml = `
    <div class="swquiz-header">
        <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
            <div id="swquiz-mainmenu" class="swquiz-mainmenu">
        </div>
    </div>
    <div id="swquiz-mode" class="swquiz-mode"></div>

    <div id="swquiz-loading" class="swquiz-loading"><h1>FEEL THE FORCE...</h1></div>
    <div id="swquiz-game-wrapper"></div>
`

export const AppView = ({renderOn, quizGameProvider, scoresRepositoryProvider, data}) => {
  const appView = document.querySelector(renderOn)
  appView.innerHTML = templateHtml;

  const {defaultModeName, modesDescriptions} = data;

  const view = {
    selectMode({modeName}) {

      const modeMenuView = ModeMenuView({
        renderOn: "#swquiz-mode",
        data: {name: modeName, title: modesDescriptions[modeName].title, rules: modesDescriptions[modeName].rules}
      }).onClickPlayTheGameButton(modeName => {
        modeMenuView.hide();
        const quizGame = quizGameProvider(modeName)
        const quizGameView = QuizGameView({
          renderOn: '#swquiz-game-wrapper',
          presenterSupplier: view => QuizGamePresenter({
            quizGame,
            quizGameView: view,
            scoresRepository: scoresRepositoryProvider(modeName)
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
                scoresRepository: scoresRepositoryProvider(modeName),
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
