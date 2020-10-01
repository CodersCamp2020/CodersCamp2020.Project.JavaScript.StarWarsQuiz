export const RealTimer = ({tickMillis, timeout, onTick, onTimeout}) => {
  let passedTime = 0;
  const timer = setInterval(() => {
    passedTime += tickMillis;
    if (onTick) {
      onTick(passedTime)
    }
    if (passedTime >= timeout) {
      if (onTimeout) {
        onTimeout(passedTime)
      }
      clearInterval(timer)
    }
  }, tickMillis)
}
