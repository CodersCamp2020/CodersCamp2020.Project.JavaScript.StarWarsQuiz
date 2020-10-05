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
}
