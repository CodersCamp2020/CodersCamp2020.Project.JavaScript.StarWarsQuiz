import {MainMenuView} from "../../../src/components/main-menu/MainMenuView";

describe("MainMenuView", () => {

  let mainMenuView;

  beforeEach(() => {
    document.body.innerHTML = `<template id="test-template-to-render"></template>`

    mainMenuView = MainMenuView({
      renderOn: "#test-template-to-render",
      options: ["people", "vehicles", "starships"],
      selectedOption: "people"
    })
  })

  it("should render given menu options and selected option should have selected class", () => {
    expect(mainMenuView.element.outerHTML)
        .toEqual(`<div id="swquiz-mainmenu" class="swquiz-mainmenu"><p class="swquiz-mainmenu-option selected" id="people">people</p><p class="swquiz-mainmenu-option" id="vehicles">vehicles</p><p class="swquiz-mainmenu-option" id="starships">starships</p></div>`)
  })


  describe("when select an option", () => {

    const onOptionSelectedHook = jest.fn();
    const selectedOption = "starships";

    beforeEach(() => {
      mainMenuView.onOptionSelected(onOptionSelectedHook)
      mainMenuView.selectOption({option: "starships"})
    })

    it("lastly selected option should be marked as selected", () => {
      expect(mainMenuView.element.outerHTML).toContain(`<p class="swquiz-mainmenu-option selected" id="starships">starships</p>`)
    })

    it("default selected option should not be marked as selected", () => {
      expect(mainMenuView.element.outerHTML).toContain(`<p class="swquiz-mainmenu-option" id="people">people</p>`)
    })

    it("then onOptionSelected hooks should be notified", () => {
      expect(onOptionSelectedHook).toBeCalledWith({option: "starships"})
    })

  })

  describe("when disable and select an option", () => {

    const onOptionSelectedHook = jest.fn();

    beforeEach(() => {
      mainMenuView.disable()
      mainMenuView.onOptionSelected(onOptionSelectedHook)
      mainMenuView.selectOption({option: "starships"})
    })

    it("lastly selected option should not be marked as selected", () => {
      expect(mainMenuView.element.outerHTML).toContain(`<p class="swquiz-mainmenu-option" id="starships">starships</p>`)
    })

  })

})
