export const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  element.style.display = 'flex';
  const answerElements = ["swquiz-answer-1", "swquiz-answer-2", "swquiz-answer-3", "swquiz-answer-4"]
      .map(answerElementId => document.getElementById(answerElementId));
  const imageToRecognizeElement = document.getElementById('swquiz-image-to-recognize');
  const view = {
    async startGame() {
      return presenter.startGame()
    },
    showQuestion({question}) {
      question.answers.forEach((answer, index) => answerElements[index].innerText = answer.name)
      answerElements.forEach(answerElement => answerElement.disabled = false)
      imageToRecognizeElement.style.backgroundImage = `url("data:image/png;base64,${question.image}")`
    },
    selectAnswer({answerName}) {
      answerElements.forEach(answerElement => answerElement.disabled = true)
      return presenter.giveAnswer({player: 'human', answer: answerName})
    }
  }
  answerElements.forEach(answerElement => answerElement.addEventListener('click', async e => {
    if(!e.target.disabled){
      await view.selectAnswer({answerName: answerElement.innerText})
    }
  }))
  const presenter = presenterSupplier(view)
  return view;
}
