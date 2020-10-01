export const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  element.style.display = 'flex';

  const presenter = presenterSupplier(this)

  return {
    async startGame() {
      return presenter.startGame()
    },
    showQuestion({question}) {

    }
  }
}
