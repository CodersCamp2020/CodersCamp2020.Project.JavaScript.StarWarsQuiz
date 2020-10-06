import {FakeTimer} from "../../src/infrastructure/FakeTimer";

describe("FakeTimer", () => {

  describe("when timeout is 0", () => {

    const onTimeout = jest.fn();
    const fakeTimer = FakeTimer({tickMillis: 1000, timeoutMillis: 0, onTimeout})

    it("then onTimeout should be notified immediately", () => {
      expect(onTimeout).toBeCalledTimes(1)
    })
  })


  describe("when timeout is more than 0", () => {

    const onTimeout = jest.fn();
    const fakeTimer = FakeTimer({tickMillis: 1000, timeoutMillis: 5000, onTimeout})

    it("then onTimeout should be notified when passed time is greater than timeout", () => {
      fakeTimer.tick();
      fakeTimer.tick();
      fakeTimer.tick();
      fakeTimer.tick();
      fakeTimer.tick();
      expect(onTimeout).toBeCalledTimes(1)
    })
  })

  describe("onTick", () => {

    const onTick = jest.fn();
    const fakeTimer = FakeTimer({tickMillis: 1000, timeoutMillis: 5000, onTick})

    it("should be called on every tick", () => {
      fakeTimer.tick();
      fakeTimer.tick();
      fakeTimer.tick();
      expect(onTick).toBeCalledTimes(3)
    })
  })

})
