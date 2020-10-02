const TIME_LEFT_TEXT = `Time Left`;

export const TextTimerView = ({renderOn, timerOn, timeout}) => {
  const element = document.querySelector(renderOn);
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }

  const timerElement = document.querySelector(timerOn)
  if (!timerElement) {
    throw new Error(`Element ${timerOn} not exists!`)
  }

  let timeLeft = timeout;
  const currentTimerText = () => `${TIME_LEFT_TEXT}: ${millisToMinutesAndSeconds(timeLeft)}`;
  timerElement.innerText = currentTimerText();
  return {
    onTimerTick({tickMillis}) {
      timeLeft -= tickMillis;
      timerElement.innerText = currentTimerText();
    },
    onTimeout() {
      timerElement.innerText = `${TIME_LEFT_TEXT}: ${millisToMinutesAndSeconds(0)}`
    }
  }
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return (minutes >= 10 ? minutes : `0${minutes}`) + "m" + " " + (seconds >= 10 ? seconds : `0${seconds}`) + "s";
}

