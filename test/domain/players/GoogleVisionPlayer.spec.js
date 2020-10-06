import 'regenerator-runtime/runtime' //async/await with Parcel
import {HumanPlayer} from "../../../src/domain/players/HumanPlayer";
import {aQuestion} from "../../fixtures";
import {GoogleVisionPlayer} from "../../../src/domain/players/GoogleVisionPlayer";

describe("GoogleVisionPlayer", () => {

  const recognizeImageMockFn = jest.fn().mockReturnValue()

  const googleVisionPlayer = GoogleVisionPlayer({
    googleVisionApi: {
      recognizeImage: recognizeImageMockFn
    }
  });

  describe("when is asked", () => {

    const onQuestionAskedHook1 = jest.fn();
    const onQuestionAskedHook2 = jest.fn();

    beforeEach(async (done) => {
      googleVisionPlayer.onQuestionAsked(onQuestionAskedHook1)
      googleVisionPlayer.onQuestionAsked(onQuestionAskedHook2)
      await googleVisionPlayer.askQuestion({question: aQuestion})
      done()
    })

    it("should notify about asked question", () => {
      expect(onQuestionAskedHook1.mock.calls.length).toEqual(1)
      expect(onQuestionAskedHook1.mock.calls[0][0]).toEqual(aQuestion)

      expect(onQuestionAskedHook2.mock.calls.length).toEqual(1)
      expect(onQuestionAskedHook2.mock.calls[0][0]).toEqual(aQuestion)
    })

    it("should try to answer with help of google vision api", () => {

    })

  })

})
