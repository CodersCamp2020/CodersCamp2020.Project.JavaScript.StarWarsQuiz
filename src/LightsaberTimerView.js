const TIMER_MAX_WIDTH_PERCENTS = '72'

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
    onTimerTick({passedTime, tickMillis}) {
      currentTimerWidthPercents -= 1.666;
      timerElement.style.width = `${currentTimerWidthPercents}%`
    },
    onTimeout() {
      timerElement.style.width = `0%`
    }
  }
}

/*
const swordTimer = document.querySelector('.sword-timer');

swordTimer.style.width = '100%';

let widthNormal = 0;
let widthTimer = 100;
let counter = 0;
const timeleft = 60; // limit czasu

function setup () {

    const timer = document.querySelector('#timer');
    timer.textContent = `Time Left: ${(timeleft - counter)}`;

    function timeIt() {
        counter++;
        timer.textContent = `Time Left: ${(timeleft - counter)}`;
            widthTimer -=1.666;

            console.log(` ${widthNormal} %`);

            swordTimer.style.width = `${widthTimer}%`;


        if (counter === timeleft) {
            clearInterval(interval);
            counter = 0;
        }
    }
   const interval = setInterval(timeIt, 1000);
}

setup();
 */
