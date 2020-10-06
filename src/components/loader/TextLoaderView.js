import {elementFrom} from "../../shared/dom";

const templateHtml = `
<div id="swquiz-loading" class="swquiz-game-text-loader">
    <h1>FEEL THE FORCE...</h1>
</div>
`

export const TextLoaderView = () => {
  const loaderElement = elementFrom({html: templateHtml})
  document.querySelector("body").appendChild(loaderElement)
  return {
    show() {
      loaderElement.style.display = 'flex'
    },
    hide() {
      loaderElement.style.display = 'none'
    }
  }
}
