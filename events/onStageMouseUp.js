import Konva from 'konva'

export const onStageMouseUp = (
  e,
  stage,
  selectionContainer,
  selectionTransformer,
  landTransformer,
  isSelectingLand,
) => {
  e.evt.preventDefault()

  // do nothing if selection isn't started
  if (!selectionContainer.current.visible()) {
    return
  }

  // update visibility in timeout, so we can check it in click event
  setTimeout(() => {
    selectionContainer.current.visible(false)
  })

  if (isSelectingLand) {
    var shapes = stage.current.find('.land')
    var box = selectionContainer.current.getClientRect()
    var selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect()),
    )
    landTransformer.current.nodes(selected)
  } else {
    var shapes = stage.current.find('.content')
    var box = selectionContainer.current.getClientRect()
    var selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect()),
    )

    if (selected.length > 0) {
      selectionTransformer.current.nodes([selected[0]])
    } else {
      selectionTransformer.current.nodes([])
    }
  }
}
