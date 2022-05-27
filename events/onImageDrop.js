import randomIndex from 'random-index'
import { preloadImage, delay } from 'helpers'
import { uploadImage } from './methods'

import { PADDING } from 'constants'

export const onImageDrop = (
  e,
  stage,
  layer,
  selectionTransformer,
  ownedLand,
  isOurLandByPos,
  setContent,
) => {
  const file = e.dataTransfer.files[0]

  // generate id
  const id = randomIndex()

  // get a blob url of an image. while image is being uploaded to the hosting
  // we show the blob url so user doesn't have to wait
  const blobUrl = URL.createObjectURL(e.dataTransfer.files[0])

  // here we create image to check it's dimensions
  // so if it exceeds the land we reposition/resize it
  const img = document.createElement('img')
  let imgWidth
  let imgHeight

  img.onload = async function () {
    imgWidth = img.width
    imgHeight = img.height

    let scaleXBy = 1
    let scaleYBy = 1

    if (imgWidth > 600) {
      scaleXBy = 600 / imgWidth
    }

    if (imgHeight > 600) {
      scaleYBy = 600 / imgHeight
    }

    if (scaleXBy < scaleYBy) {
      imgWidth = imgWidth * scaleXBy - PADDING / scaleXBy
      imgHeight = imgHeight * scaleXBy - PADDING / scaleXBy
    } else {
      imgWidth = imgWidth * scaleYBy - PADDING / scaleYBy
      imgHeight = imgHeight * scaleYBy - PADDING / scaleYBy
    }

    // get relative pointer position so we position our image
    const pointerPosition = stage.current.getRelativePointerPosition()

    // define coordinates at the pointer position
    let x = pointerPosition.x
    let y = pointerPosition.y

    // if left top corner is in our land
    if (isOurLandByPos(x, y)) {
      // if some of other corners is not, place it at the start of the land
      if (
        !isOurLandByPos(x + imgWidth, y) ||
        !isOurLandByPos(x + imgWidth, y + imgHeight) ||
        !isOurLandByPos(x, y + imgHeight)
      ) {
        x = Math.floor(x / 600) * 600
        y = Math.floor(y / 600) * 600
      }
    } else {
      // if left top is not in out land, place at the first land user owns
      const firstLand = JSON.parse(ownedLand[0])
      x = firstLand[0] * 600
      y = firstLand[1] * 600
    }

    setContent((content) => {
      content.push({
        id,
        x,
        y,
        width: imgWidth,
        height: imgHeight,
        url: blobUrl,
        type: file.type === 'image/gif' ? 'gif' : 'image',
      })
    })

    await delay(10)
    if (file.type !== 'image/gif') {
      const addedImage = stage.current.find(`.${id}`)[0]
      selectionTransformer.current.nodes([addedImage])
    }

    uploadImage(file, async (uploadedFile) => {
      preloadImage(uploadedFile.originalUrl)
      await delay(8000)

      setContent((content) => {
        const index = content.findIndex((block) => block.id === id)
        if (index !== -1) {
          content[index].url = uploadedFile.originalUrl
        }
      })
    })
  }
  img.src = blobUrl
}
