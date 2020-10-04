export const GameResultModal = ({renderOn}) => {
  const onSaveScoreHooks = [];

  const modalElement = document.querySelector(renderOn)
  if (!modalElement) {
    throw new Error(`Element ${renderOn} not exists!`)
  }

  const submitScoreSaveForm = modalElement.querySelector("#hall-of-fame-save")
  submitScoreSaveForm.addEventListener("submit", () => {
    const playerNameInput = modalElement.querySelector("#player-name-hall-of-fame")
    modal.submitScoreSave({playerName: playerNameInput.value})
  })

  const modal = {
    show({data}) {
      const googleAnswersStats = answersStats({forPlayer: 'google', answers: data.answers})
      const humanAnswersStats = answersStats({forPlayer: 'human', answers: data.answers})

      const summaryElement = modalElement.querySelector("#swquiz-game-summary")
      summaryElement.innerText = `The force is strong in you young Padawan! During 2 minutes you have answered ${humanAnswersStats.correct} / ${humanAnswersStats.all} questions. And Google guessed ${googleAnswersStats.correct} /  ${googleAnswersStats.all}.`

      modalElement.style.display = 'flex'
      const answersList = modalElement.querySelector(".swquiz-answers-table-wrapper");
      data.answers.map(answer => AnswersRowElement({answer}))
          .forEach(answersRowElement => answersList.appendChild(answersRowElement))
    },
    hide() {
      modalElement.style.display = 'none'
    },
    submitScoreSave({playerName}) {
      onSaveScoreHooks.forEach(hook => hook({playerName}))
    },
    onScoreSave(hook) {
      onSaveScoreHooks.push(hook);
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
