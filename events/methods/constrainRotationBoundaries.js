import { getClientRect } from 'helpers'
import { COLUMNS_COUNT, ROWS_COUNT, CELL_WIDTH, CELL_HEIGHT } from 'constants'

export const constrainRotationBoundaries = (
  stage,
  layer,
  oldBox,
  newBox,
  isAllCoordinatesInOurLand,
) => {
  const box = getClientRect(newBox)

  const scale = stage.current.scale()

  const shapeWidth = box.width / scale.x
  const shapeHeight = box.height / scale.y

  const xDelta = box.x - layer.current.getAbsolutePosition().x
  const x = xDelta / scale.x

  const yDelta = box.y - layer.current.getAbsolutePosition().y
  const y = yDelta / scale.y

  const isOut = !isAllCoordinatesInOurLand(
    x,
    y,
    x + shapeWidth,
    y + shapeHeight,
  )

  if (isOut) {
    return oldBox
  }

  return newBox
}
