export const QuizHallOfFameView = ({renderOn, presenterSupplier}) => {
  const modeContentElement = document.querySelector(renderOn)
  modeContentElement.innerHTML = ''
  const view = {
    loadBestScores() {
      presenter.loadBestScores();
    },
    showBestScores({bestScores}) {
      let innerHtml = ''
      if (bestScores.length === 0) {
        innerHtml += `
          <div>
            <h2>Leaderboard is empty...</h2>
          </div>
        `
        modeContentElement.innerHTML = innerHtml
        return
      }
      innerHtml += `
         <div class="swquiz-hall-of-fame-header">
            <p>Place</p>
            <p>Player</p>
            <p>Scores</p>
          </div>
        `
      innerHtml += `<div class="swquiz-hall-of-fame-table">`
      bestScores.forEach(({playerName, score}, place) => {
        innerHtml += `
          <div class="swquiz-hall-of-fame-player-row">
            <p class="swquiz-hall-of-fame-player-place">${place + 1}</p>
            <p class="swquiz-hall-of-fame-player-name">${playerName}</p>
            <p class="swquiz-hall-of-fame-player-score">${score}</p>
          </div>
        `
      })
      innerHtml += '</div>'
      modeContentElement.innerHTML = innerHtml
    }
  };
  const presenter = presenterSupplier(view);
  return view;
}
