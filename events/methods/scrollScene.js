import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  STAGE_WIDTH,
  STAGE_HEIGHT,
} from 'constants'

export const scrollScene = (e, stage) => {
  const dx = e.evt.deltaX
  const dy = e.evt.deltaY

  const minX = -(CANVAS_WIDTH - STAGE_WIDTH)
  const maxX = 0

  const x = stage.current.x() - dx

  const minY = -(CANVAS_HEIGHT - STAGE_HEIGHT)
  const maxY = 0

  const y = stage.current.y() - dy
  stage.current.position({ x, y })
}
