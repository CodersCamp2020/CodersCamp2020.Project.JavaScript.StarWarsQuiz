export const RealTimer = ({tickMillis, timeoutMillis, onTick, onTimeout}) => {
  let passedTime = 0;
  const timer = setInterval(() => {
    passedTime += tickMillis;
    if (onTick) {
      onTick({passedTime, tickMillis})
    }
    if (passedTime >= timeoutMillis) {
      if (onTimeout) {
        onTimeout(passedTime)
      }
      clearInterval(timer)
    }
  }, tickMillis)
}
