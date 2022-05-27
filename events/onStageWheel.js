import { scaleScene, scrollScene } from './methods'

export const onStageWheel = (e, stage) => {
  e.evt.preventDefault()
  const isPinch = e.evt.ctrlKey

  if (isPinch) {
    // if pinch
    scaleScene(e, stage)
  } else {
    // if scroll
    scrollScene(e, stage)
  }
}
