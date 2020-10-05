const viewTemplateHtml = ({options}) =>
    options.map(option => `<p class="swquiz-mainmenu-option" id="${option.toLowerCase()}">${option}</p>`)
        .reduce((x, y) => x + y)

export const MainMenuView = ({renderOn, options}) => {
  const onOptionSelectedHooks = [];
  const viewElement = document.querySelector(renderOn);
  viewElement.innerHTML = viewTemplateHtml({options})

  const mainMenuOptions = document.getElementsByClassName("swquiz-mainmenu-option")
  for (const modeOption of mainMenuOptions) {
    modeOption.addEventListener('click', e => {
      const option = e.target.id;
      onOptionSelectedHooks.forEach(hook => hook({option}))
    })
  }

  return {
    selectOption({option}) {
      onOptionSelectedHooks.forEach(hook => hook({option}))
    },
    onOptionSelected(hook) {
      onOptionSelectedHooks.push(hook);
    }
  }
}
