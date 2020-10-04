export const FakeTimer = ({tickMillis, timeout, onTick, onTimeout}) => {
  let passedTime = 0;
  return {
    tick() {
      passedTime += tickMillis;
      if (onTick) {
        onTick(passedTime)
      }
      if (passedTime >= timeout) {
        if (onTimeout) {
          onTimeout(passedTime)
        }
      }
    }
  }
}
