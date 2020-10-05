import {LightsaberTimerView} from "./LightsaberTimerView";
import {QUIZ_MAX_TIME} from "../domain/TimeUnits";
import {TextTimerView} from "./TextTimerView";
import {GameResultModal} from "./GameResultModal";

const viewTemplateHtml = `
        <div id="swquiz-game" class="swquiz-game">
            <div id="swquiz-image-to-recognize" class="swquiz-question-image-bg"></div>
            <div style="width: 2rem"></div>
            <div class="swquiz-question">
                <div class="swquiz-question-content"><p>Question: Who is this character?</p></div>
                <div style="height: 2rem"></div>
                <div class="swquiz-question-answers">
                    <div id="swquiz-answer-1" class="sqwuiz-question-answer">Answer1</div>
                    <div id="swquiz-answer-2" class="sqwuiz-question-answer">Answer2</div>
                    <div id="swquiz-answer-3" class="sqwuiz-question-answer">Answer3</div>
                    <div id="swquiz-answer-4" class="sqwuiz-question-answer">Answer4</div>
                </div>
            </div>        
        </div>
        <div id="swquiz-lightsaber" class="swquiz-lightsaber-wrapper"></div>
        <div id="swquiz-timer-text" class="swquiz-timer-text"></div>
`

export const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  element.innerHTML = viewTemplateHtml;

  const answerElements = ["swquiz-answer-1", "swquiz-answer-2", "swquiz-answer-3", "swquiz-answer-4"]
      .map(answerElementId => document.getElementById(answerElementId));
  const imageToRecognizeElement = document.getElementById('swquiz-image-to-recognize');

  const lightsaberTimerView = LightsaberTimerView({
    renderOn: "#swquiz-lightsaber",
    timeout: QUIZ_MAX_TIME
  });

  const textTimerView = TextTimerView({
    renderOn: "#swquiz-timer-text",
    timerOn: "#swquiz-timer-text",
    timeout: QUIZ_MAX_TIME,
  });

  const quizGameView = {
    show() {
      this.startLoading();
    },
    hide() {
      element.style.display = 'none';
      lightsaberTimerView.hide()
      textTimerView.hide()
    },
    startLoading(){
      const loadingElement = document.getElementById("swquiz-loading")
      loadingElement.style.display = 'flex'
    },
    finishLoading(){
      const loadingElement = document.getElementById("swquiz-loading")
      loadingElement.style.display = 'none'
      element.style.display = 'block';
      lightsaberTimerView.show()
      textTimerView.show()
    },
    async startGame() {
      return quizGamePresenter.startGame()
          .then(this.finishLoading)
    },
    showQuestion({question}) {
      question.answers.forEach((answer, index) => answerElements[index].innerText = answer.name)
      answerElements.forEach(answerElement => answerElement.disabled = false)
      imageToRecognizeElement.style.backgroundImage = `url("data:image/png;base64,${question.image}")`
    },
    selectAnswer({answerName}) {
      answerElements.forEach(answerElement => answerElement.disabled = true)
      return quizGamePresenter.giveAnswer({answer: answerName})
    },
    showTimePass({passedTime, tickMillis}) {
      lightsaberTimerView.tickTimer({passedTime, tickMillis})
      textTimerView.tickTimer({passedTime, tickMillis})
    },
    showGameOver(gameOver) {
      lightsaberTimerView.timeout()
      textTimerView.timeout()
      const gameResultModal = GameResultModal()
      gameResultModal.onScoreSave(({playerName}) => {
        const humanAnswers = gameOver.answers.map(it => it.humanAnswer).filter(humanAnswer => humanAnswer !== undefined)
        const score = CorrectAnswersScoreCalculator().calculate({answers: humanAnswers})
        quizGamePresenter.saveScore({playerName, score})
      })
      gameResultModal.show({data: gameOver});
    }
  }
  answerElements.forEach(answerElement => answerElement.addEventListener('click', async e => {
    if (!e.target.disabled) {
      await quizGameView.selectAnswer({answerName: answerElement.innerText})
    }
  }))
  const quizGamePresenter = presenterSupplier(quizGameView)
  return quizGameView;
}

const CorrectAnswersScoreCalculator = () => {
  return {
    calculate({answers}) {
      return answers.filter(it => it.isCorrect).length
    }
  }
}
