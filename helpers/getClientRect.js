export function getClientRect(rotatedBox) {
  const { x, y, width, height } = rotatedBox
  const rad = rotatedBox.rotation

  const p1 = getCorner(x, y, 0, 0, rad)
  const p2 = getCorner(x, y, width, 0, rad)
  const p3 = getCorner(x, y, width, height, rad)
  const p4 = getCorner(x, y, 0, height, rad)

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x)
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y)
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x)
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y)

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

function getCorner(pivotX, pivotY, diffX, diffY, angle) {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY)

  /// find angle from pivot to corner
  angle += Math.atan2(diffY, diffX)

  /// get new x and y and round it off to integer
  const x = pivotX + distance * Math.cos(angle)
  const y = pivotY + distance * Math.sin(angle)

  return { x: x, y: y }
}
