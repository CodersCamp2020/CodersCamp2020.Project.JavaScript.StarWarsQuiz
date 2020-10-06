import {
  AnswerChecker,
  ExactMatchCheckStrategy,
  IncludesCheckStrategy,
  PartialMatchCheckStrategy
} from "../../src/domain/AnswerChecker";

describe("Answer checking policies", () => {

  describe("PartialMatchCheckStrategy", () => {

    const partialMatchAnswerChecker = AnswerChecker({checkStrategy: PartialMatchCheckStrategy})

    it("answer is correct when one of answer words exists in correct answer", () => {
      const correctFirstWord = partialMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Test Answer", givenAnswer: "Test"})
      expect(correctFirstWord).toBeTruthy();

      const correctSecondWord = partialMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Test Answer", givenAnswer: "Answer"})
      expect(correctFirstWord).toBeTruthy();

      const differentOrderWords = partialMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Test Answer", givenAnswer: "Answer Test"})
      expect(differentOrderWords).toBeTruthy();
    })

    it("answer is incorrect when none of answer words exists in correct answer", () => {
      const correct = partialMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Incorrect Answer", givenAnswer: "Test"})
      expect(correct).toBeFalsy();
    })

  })

  describe("ExactMatchCheckStrategy", () => {

    const exactMatchAnswerChecker = AnswerChecker({checkStrategy: ExactMatchCheckStrategy})

    it("answer is correct when is exactly as correct answer", () => {
      const correctFirstWord = exactMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Test Answer", givenAnswer: "Test Answer"})
      expect(correctFirstWord).toBeTruthy();
    })

    it("answer is incorrect when is not exactly as correct answer", () => {
      const correctFirstWord = exactMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Answer Test", givenAnswer: "Test Answer"})
      expect(correctFirstWord).toBeFalsy();
    })

  })

  describe("IncludesCheckStrategy", () => {

    const includesMatchAnswerChecker = AnswerChecker({checkStrategy: IncludesCheckStrategy})

    it("answer is correct when is included in correct answer", () => {
      const correctFirstWord = includesMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Test Answer", givenAnswer: "es"})
      expect(correctFirstWord).toBeTruthy();
    })

    it("answer is incorrect when is not included in correct answer", () => {
      const correctFirstWord = includesMatchAnswerChecker.isAnswerCorrect({correctAnswer: "Answer Test", givenAnswer: "rewsna"})
      expect(correctFirstWord).toBeFalsy();
    })

  })

})
