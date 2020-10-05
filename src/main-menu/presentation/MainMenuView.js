export const MainMenuView = ({defaultModeName, modes}) => {
  let selectedModeName = defaultModeName;

  const onModeSelectedHooks = []

  const onClickPlayTheGameButtonHooks = []
  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook(selectedModeName)))

  const onClickHallOfFameButtonHooks = []
  const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
  hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook(selectedModeName)))

  const mainMenuOptions = document.getElementsByClassName("swquiz-mainmenu-option")
  for (const modeOption of mainMenuOptions) {
    modeOption.addEventListener('click', e => {
      const modeName = e.target.id;
      view.selectMode({modeName});
      onModeSelectedHooks.forEach(hook => hook(modeName))
    })
  }

  const view = {
    selectMode({modeName}) {
      const otherModesOptions = document.getElementsByClassName("swquiz-mainmenu-option")
      for (const otherModeOption of otherModesOptions) {
        otherModeOption.classList.remove("selected")
      }
      const menuModeOptionElement = document.getElementById(`${modeName}`)
      menuModeOptionElement.classList.add("selected")
      selectedModeName = modeName;

      const modeTitleElement = document.getElementById("swquiz-mode-title-text")
      if (modeTitleElement) {
        modeTitleElement.innerText = modes[modeName].title

        const modeRulesElement = document.getElementById("swquiz-mode-rules-text")
        modeRulesElement.innerText = modes[modeName].rules
      }
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
