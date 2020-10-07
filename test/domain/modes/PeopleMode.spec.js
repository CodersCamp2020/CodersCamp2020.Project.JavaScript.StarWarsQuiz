import {PeopleMode} from "../../../src/domain/modes/PeopleMode";
import * as Random from "../../../src/shared/Random"

describe("People mode", () => {

  const peopleMode = PeopleMode({
    repository: {
      getById: jest.fn().mockImplementation(({id}) => {
        switch (id) {
          case 1:
            return {id, name: "Luke Skywalker"}
          case 2:
            return {id, name: "C-3PO"}
          case 3:
            return {id, name: "R2-D2"}
          case 4:
            return {id, name: "Darth Vader"}
        }
      })
    },
    images: {
      find: jest.fn().mockImplementation(() => anImage)
    }
  })

  it("should have name `people`", () => {
    expect(peopleMode.name).toEqual("people")
  })

  describe("generating question", () => {

    beforeEach(() => {
      jest.spyOn(Random, 'getRandomIntInclusive')
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(3)
          .mockReturnValueOnce(4)
          .mockReturnValueOnce(0);
    });

    afterEach(() => {
      jest.spyOn(Random, 'getRandomIntInclusive').mockRestore();
    })

    it("should contains generated image, answers and indicated right answer", async (done) => {
      const generatedQuestion = await peopleMode.generateQuestion();
      expect(generatedQuestion).toEqual({
        answers: [
          {id: 1, name: "Luke Skywalker"},
          {id: 2, name: "C-3PO"},
          {id: 3, name: "R2-D2"},
          {id: 4, name: "Darth Vader"}
        ],
        image: anImage,
        rightAnswer: {
          id: 1,
          name: "Luke Skywalker"
        }
      })
      done()
    })

  })

})

const anImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
