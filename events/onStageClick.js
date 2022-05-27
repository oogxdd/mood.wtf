export const onStageClick = (
  e,
  stage,
  selectionContainer,
  selectionTransformer,
) => {
  // // clicks should select/deselect shapes
  // // if we are selecting with rect, do nothing
  if (selectionContainer.current.visible()) {
    return
  }
  // // if click on empty area - remove all selections
  if (e.target === stage.current) {
    selectionTransformer.current.nodes([])
    return
  }
  // // do nothing if clicked not on the content
  if (!e.target.hasName('content')) {
    return
  }

  // // do we pressed shift or ctrl?
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
  const isSelected = selectionTransformer.current.nodes().indexOf(e.target) >= 0
  if (!metaPressed && !isSelected) {
    // if no key pressed and the node is not selected
    // select just one
    selectionTransformer.current.nodes([e.target])
  } else if (metaPressed && isSelected) {
    // if we pressed keys and node was selected
    // we need to remove it from selection:
    const nodes = selectionTransformer.current.nodes().slice() // use slice to have new copy of array
    // remove node from array
    nodes.splice(nodes.indexOf(e.target), 1)
    selectionTransformer.current.nodes(nodes)
  } else if (metaPressed && !isSelected) {
    // add the node into selection
    const nodes = selectionTransformer.current.nodes().concat([e.target])
    selectionTransformer.current.nodes(nodes)
  }
}
