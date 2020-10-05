import {elementFrom} from "../shared/dom";

const templateHtml = `
<div id="preloader" style="display: none">
    <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
</div>
`

export const CircleLoaderView = () => {
  const element = elementFrom({html: templateHtml})
  document.querySelector("body").appendChild(element)

  return {
    show() {
      element.style.display = 'block'
    },
    hide() {
      element.style.display = 'none'
    }
  }
}
