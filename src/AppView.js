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
  const onClickHallOfFameButtonHooks = []

  const appView = document.querySelector(renderOn)
  appView.innerHTML = templateHtml;


  const view = {
    selectMode({modeName}) {
      selectedModeName = modeName;

      const modeMenuView = ModeMenuView({
        renderOn: "#swquiz-mode-menu",
        data: {title: modes[modeName].title, rules: modes[modeName].rules}
      })

      const playTheGameButton = document.getElementById("play-the-game-button")
      playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook(selectedModeName)))
      const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
      hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook(selectedModeName)))

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
