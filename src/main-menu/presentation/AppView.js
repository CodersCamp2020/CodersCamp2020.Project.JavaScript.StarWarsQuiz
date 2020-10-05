import {MainMenuView} from "./MainMenuView";

export const AppView = ({defaultModeName, modes}) => {
  let selectedModeName = defaultModeName;

  const onModeSelectedHooks = []

  const onClickPlayTheGameButtonHooks = []
  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook(selectedModeName)))

  const onClickHallOfFameButtonHooks = []
  const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
  hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook(selectedModeName)))

  MainMenuView({
    renderOn: "#swquiz-mainmenu",
    options: ["People", "Vehicles", "Starships"]
  }).onOptionSelected(({option}) => {
    view.selectMode({modeName: option})
  });

  const view = {
    selectMode({modeName}) {
      const modeContentElement = document.querySelector("#swquiz-mode-content")
      modeContentElement.innerHTML = `
        <h2>Mode Rules</h2>
        <p id="swquiz-mode-rules-text"></p>
      `

      const otherModesOptions = document.getElementsByClassName("swquiz-mainmenu-option")
      for (const otherModeOption of otherModesOptions) {
        otherModeOption.classList.remove("selected")
      }
      const menuModeOptionElement = document.getElementById(`${modeName}`)
      menuModeOptionElement.classList.add("selected")
      selectedModeName = modeName;

      const modeTitleElement = document.getElementById("swquiz-mode-title-text")
      modeTitleElement.innerText = modes[modeName].title

      const modeRulesElement = document.getElementById("swquiz-mode-rules-text")
      modeRulesElement.innerText = modes[modeName].rules
      return view;
    },
    onClickPlayTheGameButton(hook) {
      onClickPlayTheGameButtonHooks.push(hook)
      return view;
    },
    onClickHallOfFameButton(hook) {
      onClickHallOfFameButtonHooks.push(hook)
      return view;
    },
    onModeSelected(hook) {
      onModeSelectedHooks.push(hook)
      return view;
    }
  }
  view.selectMode({modeName: defaultModeName})
  return view;
}
