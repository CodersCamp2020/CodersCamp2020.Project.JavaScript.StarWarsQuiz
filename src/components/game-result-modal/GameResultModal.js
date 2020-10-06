const modalElementInnerHTML = `
    <div class="modal-content">
        <h2 style="margin-top: 0">GAME OVER</h2>
        <p id="swquiz-game-summary" class="sub-title">The force is strong in you young Padawan! During 2 minutes you have answered X / Y
            questions. And Google guessed X / Y.</p>
        <div class="player-name-hall-of-fame-wrapper">
            <div class="swquiz-yoda-answers-table-wrapper">
                <img class="swquiz-master-yoda" src="static/assets/ui/MasterYodaLeft.png" alt="Master Yoda"/>
                <div class="swquiz-hall-of-fame-answers-header-wrapper">
                    <div class="swquiz-game-result-answers-header">
                        <p></p>
                        <p>Correct</p>
                        <p>You</p>
                        <p>Google</p>
                    </div>
                    <div class="swquiz-answers-table-wrapper"></div>
                </div>
            </div>
            <form id="hall-of-fame-save" style="display: flex; align-items: center">
                <label for="player-name-hall-of-fame">
                    <input id="player-name-hall-of-fame" name="player-name-hall-of-fame"
                           class="player-name-hall-of-fame" type="text" minlength="3"
                           maxlength="15" required/>
                </label>
                <p style="font-size: 1.30rem; margin: 0; padding-left: 1rem;">Please fill your name in order to
                    receive eternal glory in the whole Galaxy!</p>
            </form>
        </div>
        <div style="text-align: center; margin-top: 4rem;">
            <button type="submit" form="hall-of-fame-save" class="sw-quiz-save-hall-of-fame-button" id="save-hall-of-fame-button">MAY THE FORCE BE WITH YOU!</button>
        </div>
    </div>
`

export const GameResultModal = () => {
  const onSaveScoreHooks = [];

  const modalElement = document.createElement("div")
  modalElement.id = "swquiz-game-result-modal"
  modalElement.classList.add("swquiz-game-result-modal")
  modalElement.innerHTML = modalElementInnerHTML;
  document.querySelector("body").appendChild(modalElement)

  const submitScoreSaveForm = modalElement.querySelector("#hall-of-fame-save")
  submitScoreSaveForm.addEventListener("submit", () => {
    const playerNameInput = modalElement.querySelector("#player-name-hall-of-fame")
    modal.submitScoreSave({playerName: playerNameInput.value})
  })

  const modal = {
    element: modalElement,
    show({data}) {
      const googleAnswersStats = answersStats({forPlayer: 'google', answers: data.answers})
      const humanAnswersStats = answersStats({forPlayer: 'human', answers: data.answers})

      const summaryElement = modalElement.querySelector("#swquiz-game-summary")
      summaryElement.innerText = `The force is strong in you young Padawan! During 2 minutes you have answered ${humanAnswersStats.correct} / ${humanAnswersStats.all} questions. And Google guessed ${googleAnswersStats.correct} /  ${googleAnswersStats.all}.`

      modalElement.style.display = 'flex'
      const answersList = modalElement.querySelector(".swquiz-answers-table-wrapper");
      data.answers.map(answer => AnswersRowElement({answer}))
          .forEach(answersRowElement => answersList.appendChild(answersRowElement))
      return modal;
    },
    hide() {
      modalElement.style.display = 'none'
      return modal;
    },
    submitScoreSave({playerName}) {
      onSaveScoreHooks.forEach(hook => hook({playerName}))
      return modal;
    },
    onScoreSave(hook) {
      onSaveScoreHooks.push(hook);
      return modal;
    }
  }
  return modal;
}

const AnswersRowElement = ({answer}) => {
  const answersRow = document.createElement("div");
  answersRow.className = "swquiz-answer-row";
  const {image, correctAnswerName, humanAnswer, googleAnswer} = answer;
  const questionImageElement = document.createElement("img");
  questionImageElement.src = `data:image/png;base64, ${image}`;
  questionImageElement.style.maxWidth = '90%'

  const rowContentElement = document.createElement("div");

  const correctAnswerNameElement = document.createElement("p")
  correctAnswerNameElement.innerText = correctAnswerName;
  correctAnswerNameElement.className = "sw-quiz-answers-table-right"

  const humanAnswerNameElement = document.createElement("p")
  humanAnswerNameElement.innerText = humanAnswer ? humanAnswer.answerName : "None"
  humanAnswerNameElement.className = humanAnswer && humanAnswer.isCorrect ? "sw-quiz-answers-table-correct" : "sw-quiz-answers-table-incorrect"

  const googleAnswerNameElement = document.createElement("p")
  googleAnswerNameElement.innerText = googleAnswer ? googleAnswer.answerName : "None"
  googleAnswerNameElement.className = googleAnswer && googleAnswer.isCorrect ? "sw-quiz-answers-table-correct" : "sw-quiz-answers-table-incorrect"

  rowContentElement.appendChild(questionImageElement);
  rowContentElement.appendChild(correctAnswerNameElement)
  rowContentElement.appendChild(humanAnswerNameElement)
  rowContentElement.appendChild(googleAnswerNameElement)

  answersRow.appendChild(rowContentElement);
  return answersRow;
}

function answersStats({forPlayer, answers}) {
  const playerAnswers = answers.map(answer => answer[`${forPlayer}Answer`])
      .filter(answer => answer !== undefined)
  return {
    all: playerAnswers.length,
    correct: playerAnswers.filter(answer => answer.isCorrect).length
  }
}
