import {MainMenuView} from "./main-menu/presentation/MainMenuView";
import {ModeMenuView} from "./mode-menu/presentation/ModeMenuView";

const templateHtml = `
    <div class="swquiz-header">
        <a class="swquiz-logo-image" href="/"><img class="swquiz-logo-image" src="static/assets/ui/StarWarsLogo.png" alt="Star Wars Logo"/></a>
        <div id="swquiz-mainmenu" class="swquiz-mainmenu">
        </div>
    </div>
    <div id="swquiz-mode" class="swquiz-mode">
        <div class="swquiz-question-image-bg"></div>
        <div style="width: 2rem"></div>
        <div id="swquiz-mode-menu" class="swquiz-mode-menu">
            <div class="swquiz-mode-title"><p id="swquiz-mode-title-text">Mode Title</p></div>
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
`

export const AppView = ({renderOn, defaultModeName, modes}) => {
  let selectedModeName = defaultModeName;

  const onClickPlayTheGameButtonHooks = []

  const appView = document.querySelector(renderOn)
  appView.innerHTML = templateHtml;

  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook(selectedModeName)))

  const onClickHallOfFameButtonHooks = []
  const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
  hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook(selectedModeName)))

  const view = {
    selectMode({modeName}) {
      selectedModeName = modeName;

      const modeMenuView = ModeMenuView({
        renderOn: "#swquiz-mode-menu",
        data: {title: modes[modeName].title, rules: modes[modeName].rules}
      })

      return view;
    },
    onClickPlayTheGameButton(hook) {
      onClickPlayTheGameButtonHooks.push(hook)
      return view;
    },
    onClickHallOfFameButton(hook) {
      onClickHallOfFameButtonHooks.push(hook)
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
