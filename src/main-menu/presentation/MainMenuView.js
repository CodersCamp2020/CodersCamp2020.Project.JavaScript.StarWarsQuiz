const viewTemplateHtml = ({options}) =>
    options.map(option => `<p class="swquiz-mainmenu-option" id="${option.toLowerCase()}">${option}</p>`)
        .reduce((x, y) => x + y)

export const MainMenuView = ({renderOn, options, selectedOption}) => {
  const onOptionSelectedHooks = [];
  const viewElement = document.querySelector(renderOn);
  viewElement.innerHTML = viewTemplateHtml({options})

  const optionsElements = document.getElementsByClassName("swquiz-mainmenu-option")
  for (const optionElement of optionsElements) {
    optionElement.addEventListener('click', e => {
      const option = e.target.id;
      view.selectOption({option})
    })
  }

  const view = {
    selectOption({option}) {
      const options = document.getElementsByClassName("swquiz-mainmenu-option")
      for (const otherModeOption of options) {
        otherModeOption.classList.remove("selected")
      }
      const selectedOptionElement = document.getElementById(`${option}`)
      selectedOptionElement.classList.add("selected")
      onOptionSelectedHooks.forEach(hook => hook({option}))
    },
    onOptionSelected(hook) {
      onOptionSelectedHooks.push(hook);
    }
  }
  if (selectedOption) {
    view.selectOption({option: selectedOption})
  }
  return view;
}
