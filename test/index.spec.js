import {App} from "../src/app/App";

describe("index", () => {

  it("should render application", () => {
    document.body.innerHTML = `<template id="test-app-template"></template>`

    App({renderOn: "#test-app-template"})

    expect(document.getElementById("swquiz-app")).toBeDefined();
  })

})
