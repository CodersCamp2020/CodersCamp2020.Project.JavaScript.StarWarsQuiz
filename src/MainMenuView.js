export const MainMenuView = ({onPlayTheGame}) => {
  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', onPlayTheGame)
}
