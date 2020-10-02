const TIMER_MAX_WIDTH_PERCENTS = '100'

export const LightsaberTimerView = ({renderOn, timerOn, timeout}) => {
  const element = document.querySelector(renderOn);
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }

  const timerElement = document.querySelector(timerOn)
  if (!timerElement) {
    throw new Error(`Element ${timerOn} not exists!`)
  }

  let currentTimerWidthPercents = TIMER_MAX_WIDTH_PERCENTS;
  timerElement.style.width = `${currentTimerWidthPercents}%`;

  return {
    onTimerTick({tickMillis}) {
      currentTimerWidthPercents -= (tickMillis / timeout * 100);
      timerElement.style.width = `${currentTimerWidthPercents}%`
    },
    onTimeout() {
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
