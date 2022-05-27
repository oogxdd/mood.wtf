export const onStageMouseMove = (
  e,
  stage,
  selectionContainer,
  selectionCoordinates,
) => {
  e.evt.preventDefault()
  // do nothing if selection isn't started
  if (!selectionContainer.current.visible()) {
    return
  }

  // get coordinates where selection has started
  const { x1, y1 } = selectionCoordinates

  // get current coordinates
  const x2 = stage.current.getRelativePointerPosition().x
  const y2 = stage.current.getRelativePointerPosition().y

  // update selection view
  selectionContainer.current.setAttrs({
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  })
}
