export const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  element.style.display = 'flex';
  const answerElements = ["swquiz-answer-1", "swquiz-answer-2", "swquiz-answer-3", "swquiz-answer-4"]
      .map(answerElementId => document.getElementById(answerElementId));
  const imageToRecognizeElement = document.getElementById('swquiz-image-to-recognize');
  let currentQuestion = undefined;
  const view = {
    async startGame() {
      return presenter.startGame()
    },
    showQuestion({question}) {
      currentQuestion = question;
      question.answers.forEach((answer, index) => answerElements[index].innerText = answer.name)
      answerElements.forEach(answerElement => answerElement.disabled = false)
      imageToRecognizeElement.style.backgroundImage = `url("data:image/png;base64,${question.image}")`
    },
    selectAnswer({answerName}) {
      answerElements.forEach(answerElement => answerElement.disabled = true)
      const answer = currentQuestion.answers.find(answer => answer.name === answerName)
      return presenter.giveAnswer({player: 'human', answer})
    }
  }
  answerElements.forEach(answerElement => answerElement.addEventListener('click', e => {
    if(!e.target.disabled){
      view.selectAnswer({answerName: answerElement.innerText})
          .then(()=>console.log("DSAD"))
    }
  }))
  const presenter = presenterSupplier(view)
  return view;
}
