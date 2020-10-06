export const FakeTimer = ({tickMillis, timeoutMillis, onTick, onTimeout}) => {
  let passedTime = 0;

  const checkTimeout = () => {
    if (passedTime >= timeoutMillis) {
      if (onTimeout) {
        onTimeout(passedTime)
      }
    }
  };
  checkTimeout();
  return {
    tick() {
      passedTime += tickMillis;
      if (onTick) {
        onTick(passedTime)
      }
      checkTimeout();
    }
  }
}
