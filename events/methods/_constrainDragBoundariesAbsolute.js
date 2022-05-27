import {
  COLUMNS_COUNT,
  ROWS_COUNT,
  CELL_WIDTH,
  CELL_HEIGHT,
  PADDING,
} from 'constants'

export const constrainDragBoundaries = (
  stage,
  layer,
  box,
  shape,
  lastBlock,
  setLastBlock,
  isAllCoordinatesInOurLand,
) => {
  const scale = stage.current.scale()

  // relative shape dimenstions
  const shapeWidth = box.width / scale.x
  const shapeHeight = box.height / scale.y

  const xDelta = box.x - layer.current.getAbsolutePosition().x
  let x = xDelta / scale.x

  const yDelta = box.y - layer.current.getAbsolutePosition().y
  let y = yDelta / scale.y

  if (isAllCoordinatesInOurLand(x, y, x + shapeWidth, y + shapeHeight)) {
    const xIndex = Math.floor(x / 600)
    const yIndex = Math.floor(y / 600)
    const x2Index = Math.floor((x + shapeWidth) / 600)
    const y2Index = Math.floor((y + shapeHeight) / 600)

    if (
      lastBlock.x !== xIndex ||
      lastBlock.y !== yIndex ||
      lastBlock.x2 !== x2Index ||
      lastBlock.y2 !== y2Index
    ) {
      setLastBlock({
        x: xIndex,
        y: yIndex,
        x2: Math.floor((x + shapeWidth) / 600),
        y2: Math.floor((y + shapeHeight) / 600),
      })
    }
  } else {
    const absPos = shape.getAbsolutePosition()
    const offsetX = box.x - absPos.x
    const offsetY = box.y - absPos.y

    if (x < lastBlock.x * 600) {
      x = lastBlock.x * 600 + PADDING
    }

    if (y < lastBlock.y * 600) {
      y = lastBlock.y * 600 + PADDING
    }

    if (x + shapeWidth > (lastBlock.x2 + 1) * 600) {
      x = (lastBlock.x2 + 1) * 600 - shapeWidth - PADDING
    }

    if (y + shapeHeight > (lastBlock.y2 + 1) * 600) {
      y = (lastBlock.y2 + 1) * 600 - shapeHeight - PADDING
    }

    const layerXAbs = layer.current.getAbsolutePosition().x
    const layerYAbs = layer.current.getAbsolutePosition().y

    // here we transform relative position to absolute
    // also add offset (counts when box is rotated)
    let finalX = x * scale.x + layerXAbs - offsetX
    let finalY = y * scale.y + layerYAbs - offsetY

    shape.setAbsolutePosition({
      x: finalX,
      y: finalY,
    })
  }
}
