const SCALE_BY = 1.05

export const scaleScene = (e, stage) => {
  var prevScale = stage.current.scaleX()
  var pointer = stage.current.getPointerPosition()

  var mousePointTo = {
    x: (pointer.x - stage.current.x()) / prevScale,
    y: (pointer.y - stage.current.y()) / prevScale,
  }

  let wheel = -(e.evt.deltaY > 0 ? 1 : -1)

  var newScale = wheel > 0 ? prevScale * SCALE_BY : prevScale / SCALE_BY

  stage.current.scale({ x: newScale, y: newScale })

  var newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  }
  stage.current.position(newPos)
}
