import {MainMenuView} from "../main-menu/presentation/MainMenuView";
import {ModeMenuView} from "../mode-menu/presentation/ModeMenuView";
import {QuizGameView} from "../quiz-game/presentation/QuizGameView";
import {QuizGamePresenter} from "../quiz-game/presentation/QuizGamePresenter";
import {QuizHallOfFameView} from "../quiz-hall-of-fame/presentation/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "../quiz-hall-of-fame/presentation/QuizHallOfFamePresenter";
import {render} from "../shared/dom";

const templateHtml = `
    <div id="swquiz-app">
        <div class="swquiz-header">
            <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
                <template id="swquiz-mainmenu" class="swquiz-mainmenu"></template>
        </div>
        <template id="swquiz-mode"></template>

        <div id="swquiz-loading" class="swquiz-loading"><h1>FEEL THE FORCE...</h1></div>
        <template id="swquiz-game-wrapper"></template>
    </div>
`

export const AppView = ({renderOn, quizGameProvider, scoresRepositoryProvider, data}) => {
  render({on: renderOn, html: templateHtml})

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
        mainMenuView.disable()
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

  const mainMenuView = MainMenuView({
    renderOn: "#swquiz-mainmenu",
    options: ["people", "vehicles", "starships"],
    selectedOption: "people"
  }).onOptionSelected(({option}) => {
    view.selectMode({modeName: option})
  });
  view.selectMode({modeName: defaultModeName})
  return view;
}
