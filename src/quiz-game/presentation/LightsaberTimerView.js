const TIMER_MAX_WIDTH_PERCENTS = '100'

const viewTemplateHtml = `
        <div class="swquiz-lightsaber-background">
            <div class="swquiz-lightsaber-timer"></div>
        </div>
`

export const LightsaberTimerView = ({renderOn, timeout}) => {
  const element = document.querySelector(renderOn);
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }
  element.innerHTML = viewTemplateHtml

  const timerElement = document.querySelector(".swquiz-lightsaber-timer")
  if (!timerElement) {
    throw new Error(`Element ${timerOn} not exists!`)
  }

  let currentTimerWidthPercents = TIMER_MAX_WIDTH_PERCENTS;
  timerElement.style.width = `${currentTimerWidthPercents}%`;

  return {
    tickTimer({tickMillis}) {
      currentTimerWidthPercents -= (tickMillis / timeout * 100);
      timerElement.style.width = `${currentTimerWidthPercents}%`
    },
    timeout() {
      timerElement.style.width = `0%`
    },
    show() {
      element.style.display = 'flex';
    },
    hide() {
      element.style.display = 'none'
    }
  }
}
