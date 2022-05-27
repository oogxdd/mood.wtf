export const onImageDragEnd = (e, setContent, blockIndex, setLastBlock) => {
  const target = e.target

  setContent((blocks) => {
    blocks[blockIndex].isDragging = false
    blocks[blockIndex].x = e.target.x()
    blocks[blockIndex].y = e.target.y()
  })

  setLastBlock({
    x: undefined,
    y: undefined,
    x2: undefined,
    y2: undefined,
  })
}
