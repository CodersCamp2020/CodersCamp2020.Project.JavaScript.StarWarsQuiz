import {LightsaberTimerView} from "./LightsaberTimerView";
import {QUIZ_MAX_TIME} from "./TimeUnits";

export const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  const answerElements = ["swquiz-answer-1", "swquiz-answer-2", "swquiz-answer-3", "swquiz-answer-4"]
      .map(answerElementId => document.getElementById(answerElementId));
  const imageToRecognizeElement = document.getElementById('swquiz-image-to-recognize');

  const lightsaberTimerView = LightsaberTimerView({
    renderOn: "#swquiz-lightsaber",
    timerOn: ".swquiz-lightsaber-timer",
    timeout: QUIZ_MAX_TIME
  });

  const quizGameView = {
    show() {
      element.style.display = 'flex';
    },
    hide() {
      element.style.display = 'none';
    },
    async startGame() {
      return humanUiPresenter.startGame()
    },
    showQuestion({question}) {
      question.answers.forEach((answer, index) => answerElements[index].innerText = answer.name)
      answerElements.forEach(answerElement => answerElement.disabled = false)
      imageToRecognizeElement.style.backgroundImage = `url("data:image/png;base64,${question.image}")`
    },
    selectAnswer({answerName}) {
      answerElements.forEach(answerElement => answerElement.disabled = true)
      return humanUiPresenter.giveAnswer({answer: answerName})
    },
    onTimerTick({passedTime, tickMillis}) {
      lightsaberTimerView.onTimerTick({passedTime, tickMillis})
    },
    onTimeout(){
      lightsaberTimerView.onTimeout()
    }
  }
  answerElements.forEach(answerElement => answerElement.addEventListener('click', async e => {
    if (!e.target.disabled) {
      await quizGameView.selectAnswer({answerName: answerElement.innerText})
    }
  }))
  const humanUiPresenter = presenterSupplier(quizGameView)
  return quizGameView;
}
