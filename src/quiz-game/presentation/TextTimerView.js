import {render} from "../../shared/dom";

const TIME_LEFT_TEXT = `Time Left`;

const templateHtml = `<div id="swquiz-timer-text" class="swquiz-timer-text"></div>`

export const TextTimerView = ({renderOn, timeout}) => {
  const element = render({on: renderOn, html: templateHtml})

  let timeLeft = timeout;
  const currentTimerText = () => `${TIME_LEFT_TEXT}: ${millisToMinutesAndSeconds(timeLeft)}`;
  element.innerText = currentTimerText();
  return {
    tickTimer({tickMillis}) {
      timeLeft -= tickMillis;
      element.innerText = currentTimerText();
    },
    timeout() {
      element.innerText = `${TIME_LEFT_TEXT}: ${millisToMinutesAndSeconds(0)}`
    },
    show() {
      element.style.display = 'block';
    },
    hide() {
      element.style.display = 'none'
    }
  }
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return (minutes >= 10 ? minutes : `0${minutes}`) + "m" + " " + (seconds >= 10 ? seconds : `0${seconds}`) + "s";
}

