const emptyBoardTemplateHtml = `
<div>
    <h2>Leaderboard is empty...</h2>
</div>
`
const bestScoresHtml = (bestScores) => bestScores.map(({playerName, score}, place) =>
    `
          <div class="swquiz-hall-of-fame-player-row">
            <p class="swquiz-hall-of-fame-player-place">${place + 1}</p>
            <p class="swquiz-hall-of-fame-player-name">${playerName}</p>
            <p class="swquiz-hall-of-fame-player-score">${score}</p>
          </div>
        `
).reduce((x, y) => x + y)

const filledBoardTemplateHtml = (bestScoresHtml) => `
<div class="swquiz-hall-of-fame-header">
    <p>Place</p>
    <p>Player</p>
    <p>Scores</p>
</div>
<div class="swquiz-hall-of-fame-table">
${bestScoresHtml}
</div>
`

export const QuizHallOfFameView = ({renderOn, presenterSupplier}) => {
  const modeContentElement = document.querySelector(renderOn)
  modeContentElement.innerHTML = ''
  const view = {
    loadBestScores() {
      presenter.loadBestScores();
    },
    showBestScores({bestScores}) {
      modeContentElement.innerHTML = bestScores.length === 0 ? emptyBoardTemplateHtml : filledBoardTemplateHtml(bestScoresHtml(bestScores))
    }
  };
  const presenter = presenterSupplier(view);
  return view;
}
