import {GameResultModal} from "../../../src/components/game-result-modal/GameResultModal";
import {aModalData} from "./fixtures";

describe("Component | Game Result Modal", () => {

  const modal = GameResultModal()
  modal.show({data: aModalData})

  describe('when submit score save', () => {

    const scoreSavedHook = jest.fn();
    modal.onScoreSave(scoreSavedHook)

    it('then score saved hooks should be notified', () => {
      const playerName = "Sample Player Name"
      modal.submitScoreSave({playerName})

      expect(scoreSavedHook).toBeCalledTimes(1);
      expect(scoreSavedHook).toBeCalledWith({playerName});
    })


  });

})
