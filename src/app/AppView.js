import {MainMenuView} from "../components/main-menu/MainMenuView";
import {ModeMenuView} from "../components/mode-menu/ModeMenuView";
import {QuizGameView} from "../components/quiz-game/QuizGameView";
import {QuizGamePresenter} from "../components/quiz-game/QuizGamePresenter";
import {QuizHallOfFameView} from "../components/quiz-hall-of-fame/QuizHallOfFameView";
import {QuizHallOfFamePresenter} from "../components/quiz-hall-of-fame/QuizHallOfFamePresenter";
import {render} from "../shared/dom";

const templateHtml = `
    <div id="swquiz-app">
        <div class="swquiz-header">
            <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
                <template id="swquiz-mainmenu" class="swquiz-mainmenu"></template>
        </div>
        <template id="swquiz-mode"></template>
        <template id="swquiz-game-wrapper"></template>
    </div>
`

export const AppView = ({renderOn, quizGameProvider, scoresRepositoryProvider, quizMaxTime, data}) => {
  render({on: renderOn, html: templateHtml})

  const {defaultModeName, modesDescriptions} = data;

  const view = {
    selectMode({modeName}) {

      const modeMenuView = ModeMenuView({
        renderOn: "#swquiz-mode",
        data: {name: modeName, title: modesDescriptions[modeName].title, rules: modesDescriptions[modeName].rules}
      }).onClickPlayTheGameButton(modeName => {
        modeMenuView.hide();
        const quizGame = quizGameProvider({modeName, quizMaxTime})
        const quizGameView = QuizGameView({
          renderOn: '#swquiz-game-wrapper',
          quizMaxTime,
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
