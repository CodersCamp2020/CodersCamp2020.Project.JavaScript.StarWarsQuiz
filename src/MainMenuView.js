export const MainMenuView = () => {
  const playTheGameButton = document.getElementById("play-the-game-button")

  const onPlayTheGameHooks = []
  playTheGameButton.addEventListener('click', () => onPlayTheGameHooks.forEach(hook => hook()))
  const view = {
    onPlayTheGame(hook) {
      onPlayTheGameHooks.push(hook)
      return view;
    }
  }
  return view;
}
