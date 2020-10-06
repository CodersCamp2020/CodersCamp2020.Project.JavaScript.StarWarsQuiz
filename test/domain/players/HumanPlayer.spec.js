import {HumanPlayer} from "../../../src/domain/players/HumanPlayer";
import {aQuestion} from "../../fixtures";

describe("HumanPlayer", () => {

  const humanPlayer = HumanPlayer();

  describe("when is asked", () => {

    const onQuestionAskedHook1 = jest.fn();
    const onQuestionAskedHook2 = jest.fn();

    beforeEach(async (done)=>{
      humanPlayer.onQuestionAsked(onQuestionAskedHook1)
      humanPlayer.onQuestionAsked(onQuestionAskedHook2)
      await humanPlayer.askQuestion({question: aQuestion})
      done()
    })

    it("should notify about asked question", () => {
      expect(onQuestionAskedHook1.mock.calls.length).toEqual(1)
      expect(onQuestionAskedHook1.mock.calls[0][0]).toEqual(aQuestion)

      expect(onQuestionAskedHook2.mock.calls.length).toEqual(1)
      expect(onQuestionAskedHook2.mock.calls[0][0]).toEqual(aQuestion)
    })

  })

})
