import {render} from "../../shared/dom";

const templateHtml = (inner) => `
  <div id="swquiz-mainmenu" class="swquiz-mainmenu">${inner}</div>
`

const optionsTemplateHtml = ({options}) =>
    options.map(option => `<p class="swquiz-mainmenu-option" id="${option.toLowerCase()}">${option}</p>`)
        .reduce((x, y) => x + y)

export const MainMenuView = ({renderOn, options, selectedOption}) => {
  render({on: renderOn, html: templateHtml(optionsTemplateHtml({options}))})

  const onOptionSelectedHooks = [];

  const view = {
    selectOption({option}) {
      const options = document.getElementsByClassName("swquiz-mainmenu-option")
      for (const otherModeOption of options) {
        otherModeOption.classList.remove("selected")
      }
      const selectedOptionElement = document.getElementById(`${option}`)
      selectedOptionElement.classList.add("selected")
      onOptionSelectedHooks.forEach(hook => hook({option}))
      return view;
    },
    onOptionSelected(hook) {
      onOptionSelectedHooks.push(hook);
      return view;
    },
    disable() {
      forEachOptionElement(optionElement =>
          optionElement.replaceWith(optionElement.cloneNode(true))
      )
      return view;
    },
    enable() {
      forEachOptionElement(optionElement =>
          optionElement.addEventListener('click', e => {
            const option = e.target.id;
            view.selectOption({option})
          })
      )
    }
  }
  view.enable();
  if (selectedOption) {
    view.selectOption({option: selectedOption})
  }
  return view;
}

function forEachOptionElement(eachFn) {
  const optionsElements = document.getElementsByClassName("swquiz-mainmenu-option")
  for (const optionElement of optionsElements) {
    eachFn(optionElement)
  }
}
