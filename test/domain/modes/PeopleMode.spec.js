import {PeopleMode} from "../../../src/domain/modes/PeopleMode";

describe("People mode", () => {

  const dummyRepository = {
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
  }
  const dummyImages = {
    find: jest.fn().mockReturnValue(anImage)
  }

  const peopleMode = PeopleMode({repository: dummyRepository, images: dummyImages})

  it("should have name `people`", () => {
    expect(peopleMode.name).toEqual("people")
  })

  describe("generating question", () => {

    beforeEach(() => {
      jest.spyOn(global.Math, 'random')
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(3)
          .mockReturnValueOnce(4);
    });

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    })

    it("should", () => {
      expect(Math.random()).toEqual(1)
      expect(Math.random()).toEqual(2)
    })

    it("should2", async (done) => {
      const generatedQuestion = await peopleMode.generateQuestion();
      done()
    })

  })

})

const anImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
