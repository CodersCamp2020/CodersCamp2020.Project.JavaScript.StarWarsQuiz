export const MainMenuView = () => {
  const onClickPlayTheGameButtonHooks = []
  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook()))

  const onClickHallOfFameButtonHooks = []
  const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
  hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook()))

  const view = {
    onClickPlayTheGameButton(hook) {
      onClickPlayTheGameButtonHooks.push(hook)
      return view;
    },
    onClickHallOfFameButton(hook) {
      onClickHallOfFameButtonHooks.push(hook)
      return view;
    }
  }
  return view;
}
