export const onImageDragStart = (
  e,
  setContent,
  blockIndex,
  selectionTransformer,
  setLastBlock,
  box,
  stage,
  layer,
) => {
  setContent((blocks) => {
    const id = e.target.attrs.id
    const thisBlock = blocks.find((i) => i.id === id)
    thisBlock.isDragging = true
    const index = blocks.indexOf(thisBlock)

    //https://konvajs.org/docs/react/zIndex.html
    // remove from the list:
    blocks.splice(index, 1)
    // add to the top
    blocks.push(thisBlock)
  })
  if (selectionTransformer.current.nodes().length <= 1) {
    selectionTransformer.current.nodes([e.target])
  }

  const shape = e.target

  const scale = stage.current.scale()

  // relative shape dimenstions
  const shapeWidth = box.width / scale.x
  const shapeHeight = box.height / scale.y

  const xDelta = box.x - layer.current.getAbsolutePosition().x
  let x = Math.ceil(xDelta / scale.x)

  const yDelta = box.y - layer.current.getAbsolutePosition().y
  let y = Math.ceil(yDelta / scale.y)

  const xIndex = Math.floor(x / 600)
  const yIndex = Math.floor(y / 600)
  const x2Index = Math.floor((x + shapeWidth) / 600)
  const y2Index = Math.floor((y + shapeHeight) / 600)

  setLastBlock({
    x: xIndex,
    y: yIndex,
    x2: x2Index,
    y2: y2Index,
  })
}
