import {elementFrom, render} from "../../src/shared/dom";

describe("elementFrom | Creating element from string with html", () => {

  it("Scenario: create empty div", () => {
    const element = elementFrom({html: `<div></div>`})

    expect(element).not.toBeNull();
  })

  it("Scenario: create element with class", () => {
    const element = elementFrom({html: `<div class="test-class"></div>`})

    expect(element.classList).toContain("test-class")
  })

  it("Scenario: create element with children", () => {
    const element = elementFrom({html: `<div class="test-class"><h1>Test Text H1</h1><h2>Header test H2</h2></div>`})

    expect(element.outerHTML).toEqual(`<div class="test-class"><h1>Test Text H1</h1><h2>Header test H2</h2></div>`)
    expect(element.innerHTML).toEqual(`<h1>Test Text H1</h1><h2>Header test H2</h2>`)
  })

})

describe("render | Replacing element with new one ", () => {

  describe("should replace by given query selector", () => {

    it("#id query selector", () => {
      document.body.innerHTML = `<html lang="pl"><body><template id="test-template-to-render"></template></body></html>`

      render({html: `<h1 id="rendered-element">Render Test</h1>`, on: "#test-template-to-render"})

      expect(document.getElementById('test-template-to-render')).toBeFalsy()
      expect(document.getElementById('rendered-element')).toBeDefined()
      expect(document.getElementById('rendered-element').outerHTML).toEqual(`<h1 id="rendered-element">Render Test</h1>`)
    })

  })

})
