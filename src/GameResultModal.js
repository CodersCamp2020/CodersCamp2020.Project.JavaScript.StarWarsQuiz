export const GameResultModal = ({renderOn}) => {
  const modalElement = document.querySelector(renderOn)
  if (!modalElement) {
    throw new Error(`Element ${renderOn} not exists!`)
  }

  return {
    show(){
      modalElement.style.display = 'block'
    }
  }
}
