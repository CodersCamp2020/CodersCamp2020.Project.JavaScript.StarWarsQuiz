import {render} from "../../shared/dom";

const TIMER_MAX_WIDTH_PERCENTS = '100'

const viewTemplateHtml = `
    <div id="swquiz-lightsaber" class="swquiz-lightsaber-wrapper">
        <div class="swquiz-lightsaber-background">
            <div class="swquiz-lightsaber-timer"></div>
        </div>
    </div>
`

export const LightsaberTimerView = ({renderOn, timeout}) => {
  const element = render({on: renderOn, html: viewTemplateHtml})

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
