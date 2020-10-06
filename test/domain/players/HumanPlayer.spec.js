import 'regenerator-runtime/runtime' //async/await with Parcel
import {HumanPlayer} from "../../../src/domain/players/HumanPlayer";
import {aQuestion} from "../../fixtures";

describe("HumanPlayer", () => {

  const humanPlayer = HumanPlayer();

  describe("when is asked", () => {

    const onQuestionAskedHook = jest.fn();
    beforeEach(async (done)=>{
      humanPlayer.onQuestionAsked(onQuestionAskedHook)
      await humanPlayer.askQuestion({question: aQuestion})
      done()
    })

    it("should notify about asked question", () => {
      expect(onQuestionAskedHook.mock.calls.length).toEqual(1)
      expect(onQuestionAskedHook.mock.calls[0][0]).toEqual(aQuestion)
    })

  })

})
