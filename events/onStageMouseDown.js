export const onStageMouseDown = (
  e,
  stage,
  selectionContainer,
  setSelectionCoordinates,
) => {
  e.evt.preventDefault()

  if (!selectionContainer.current.visible()) {
    // capture selection rectangle start coordinates
    setSelectionCoordinates({
      x1: stage.current.getRelativePointerPosition().x,
      y1: stage.current.getRelativePointerPosition().y,
      x2: stage.current.getRelativePointerPosition().x,
      y2: stage.current.getRelativePointerPosition().y,
    })

    // start the selection - set shape to be visible but with zero size
    if (
      !e.target.name().includes('content') &&
      !e.target.name().includes('rotater') &&
      !e.target.name().includes('_anchor')
    ) {
      selectionContainer.current.visible(true)
      selectionContainer.current.width(0)
      selectionContainer.current.height(0)
      selectionContainer.current.x(stage.current.getRelativePointerPosition().x)
      selectionContainer.current.y(stage.current.getRelativePointerPosition().y)
    }
  }
}
