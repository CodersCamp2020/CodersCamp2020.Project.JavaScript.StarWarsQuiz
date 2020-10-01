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
      console.log("QUESTION", question)
      imageToRecognizeElement.style.backgroundImage=`url("data:image/png;base64,${question.image}")`
    }
  }
  const presenter = presenterSupplier(view)
  return view;
}
