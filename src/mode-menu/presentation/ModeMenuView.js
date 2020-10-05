const templateHtml = ({title,rules}) => `

            <div class="swquiz-mode-title"><p id="swquiz-mode-title-text">${title}</p></div>
            <div id="swquiz-mode-content" class="swquiz-mode-content">
                <h2>Mode Rules</h2>
                <p id="swquiz-mode-rules-text">${rules}</p>
            </div>
            <div class="sw-quiz-mode-buttons">
                <button id="swquiz-mode-hall-of-fame-button" class="sw-quiz-mode-button-secondary">Hall of fame</button>
                <div style="width: 2rem"></div>
                <button class="sw-quiz-mode-button-play" id="play-the-game-button">PLAY THE GAME</button>
            </div>
`

export const ModeMenuView = ({renderOn, data}) => {
  const element = document.querySelector(renderOn)
  element.innerHTML = templateHtml({name: data.name, title: data.title, rules: data.rules})

  const onClickPlayTheGameButtonHooks = []
  const onClickHallOfFameButtonHooks = []

  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => onClickPlayTheGameButtonHooks.forEach(hook => hook(data.name)))
  const hallOfFameButton = document.getElementById("swquiz-mode-hall-of-fame-button")
  hallOfFameButton.addEventListener('click', () => onClickHallOfFameButtonHooks.forEach(hook => hook(data.name)))
  const view = {
    onClickPlayTheGameButton(hook) {
      onClickPlayTheGameButtonHooks.push(hook)
      return view;
    },
    onClickHallOfFameButton(hook) {
      onClickHallOfFameButtonHooks.push(hook)
      return view;
    },
    hide(){
      element.style.display = 'none'
    }
  }
  return view;
}
