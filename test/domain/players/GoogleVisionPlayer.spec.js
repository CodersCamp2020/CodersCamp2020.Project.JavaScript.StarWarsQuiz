import {aQuestion} from "../../fixtures";
import {GoogleVisionPlayer} from "../../../src/domain/players/GoogleVisionPlayer";

describe("GoogleVisionPlayer", () => {

  const googleVisionApiResponse = "Luke Skywalker"
  const recognizeImageMockFn = jest.fn().mockReturnValue(googleVisionApiResponse)

  const googleVisionPlayer = GoogleVisionPlayer({
    googleVisionApi: {
      recognizeImage: recognizeImageMockFn
    }
  });

  describe("when is asked", () => {
    const onAnswerGivenHook1 = jest.fn();
    const onAnswerGivenHook2 = jest.fn();

    beforeEach(async (done) => {
      googleVisionPlayer.onAnswerGiven(onAnswerGivenHook1)
      googleVisionPlayer.onAnswerGiven(onAnswerGivenHook2)
      await googleVisionPlayer.askQuestion({question: aQuestion})
      done()
    })

    it("should try to answer with help of google vision api", () => {
      expect(onAnswerGivenHook1).toBeCalledTimes(1)
      expect(onAnswerGivenHook1).toBeCalledWith(googleVisionApiResponse)

      expect(onAnswerGivenHook2).toBeCalledTimes(1)
      expect(onAnswerGivenHook2).toBeCalledWith(googleVisionApiResponse)
    })

  })

})
