import { useState, useEffect, useRef, useContext } from 'react'
import { CanvasContext, LandContext, ContentContext } from 'context'
import { Stage, Layer, Transformer, Rect } from 'react-konva'
import { Grid, LandManager, Img, Gif } from 'components'
import {
  onStageMouseDown as onMouseDown,
  onStageMouseMove as onMouseMove,
  onStageMouseUp as onMouseUp,
  onStageClick as onClick,
  onStageWheel as onWheel,
  onImageDragStart,
  onImageDragEnd,
  onImageDrop,
} from 'events'
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from 'constants'
import {
  constrainDragBoundaries,
  constrainRotationBoundaries,
} from 'events/methods'
import { useOnDrop, usePreventDefaultDrop, useOnBackspace } from 'hooks'
import { getClientRect, getTotalBox } from 'helpers'

export default function Canvas() {
  const {
    ownedLand,
    selectedLand,
    isSelectingLand,
    setSelectedLand,
    isOurLandByPos,
    isAllCoordinatesInOurLand,
    isObjectInTheLand,
  } = useContext(LandContext)
  const { content, setContent } = useContext(ContentContext)
  const {
    scale,
    setScale,
    position,
    setPosition,
    selectionCoordinates,
    setSelectionCoordinates,
  } = useContext(CanvasContext)
  const [lastBlock, setLastBlock] = useState({
    x: undefined,
    y: undefined,
    x2: undefined,
    y2: undefined,
  })

  const stageRef = useRef(null)
  const layerRef = useRef(null)

  const selectionTransformerRef = useRef(null)
  const selectionContainerRef = useRef(null)

  const landTransformerRef = useRef(null)

  // initially select lands which we own
  useEffect(() => {
    if (ownedLand.length > 0) {
      const landNodes = stageRef.current.find(`.land`)
      const myLandNodes = landNodes.filter((node) =>
        ownedLand.includes(node.attrs.id),
      )
      landTransformerRef.current.nodes(myLandNodes)
    }
  }, [])

  useOnDrop({
    canDrop: !isSelectingLand,
    onDrop: (e) =>
      onImageDrop(
        e,
        stageRef,
        layerRef,
        selectionTransformerRef,
        ownedLand,
        isOurLandByPos,
        setContent,
      ),
    onDropFail: () =>
      alert('Buy some land first (select some rectangles to buy)'),
  })

  usePreventDefaultDrop()

  // useOnBackspace({
  //   onBackspace: () => {
  //     // delete block if selected and pressed "Del"
  //     if (selectionTransformerRef.current.nodes().length !== 0) {
  //       selectionTransformerRef.current.nodes().forEach((node) => {
  //         setContent((content) => {
  //           const index = content.findIndex(
  //             (block) => block.id === node.attrs.id,
  //           )
  //           if (index !== -1) {
  //             content.splice(index, 1)
  //             selectionTransformerRef.current.nodes([])
  //           }
  //         })
  //       })
  //     }
  //   },
  // })
  useEffect(() => {
    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Backspace') {
          // delete block if selected and clicked 'Del'
          if (!isSelectingLand) {
            if (selectionTransformerRef.current.nodes().length !== 0) {
              selectionTransformerRef.current.nodes().forEach((node) => {
                setContent((content) => {
                  const index = content.findIndex(
                    (block) => block.id === node.attrs.id,
                  )
                  if (index !== -1) {
                    content.splice(index, 1)
                    selectionTransformerRef.current.nodes([])
                  }
                })
              })
            }
          }
        }
      },
      false,
    )
  }, [])

  return (
    <>
      <Stage
        ref={stageRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        scale={scale}
        position={position}
        draggable={false}
        onMouseDown={(e) =>
          onMouseDown(
            e,
            stageRef,
            selectionContainerRef,
            setSelectionCoordinates,
            selectionTransformerRef,
          )
        }
        onMouseMove={(e) =>
          onMouseMove(e, stageRef, selectionContainerRef, selectionCoordinates)
        }
        onMouseUp={(e) => {
          if (isSelectingLand) {
            // do nothing if we didn't start selection
            if (!selectionContainerRef.current.visible()) {
              return
            }

            e.evt.preventDefault()

            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
              selectionContainerRef.current.visible(false)
              selectionContainerRef.current.width(0)
              selectionContainerRef.current.height(0)
            })

            var shapes = stageRef.current.find('.land')
            var box = selectionContainerRef.current.getClientRect()
            var selected = shapes.filter((shape) =>
              Konva.Util.haveIntersection(box, shape.getClientRect()),
            )

            if (selected.every((l) => l.attrs.name.includes('my-block'))) {
              // 1. if all of selected are yours - select
              setSelectedLand(selected.map((block) => block.attrs.id))
            } else if (
              selected.every((l) => !l.attrs.name.includes('my-block'))
            ) {
              // 2. if all of selected aren't yours - select
              setSelectedLand(selected.map((block) => block.attrs.id))
            } else {
              // 3. if mixed - only select ones you don't own
              setSelectedLand(
                selected
                  .filter((l) => !l.attrs.name.includes('my-block'))
                  .map((block) => block.attrs.id),
              )
            }
          } else {
            onMouseUp(
              e,
              stageRef,
              selectionContainerRef,
              selectionTransformerRef,
            )
          }
        }}
        onClick={(e) =>
          onClick(
            e,
            stageRef,
            selectionContainerRef,
            selectionTransformerRef,
            landTransformerRef,
            isSelectingLand,
          )
        }
        onWheel={(e) => onWheel(e, stageRef)}
      >
        <Layer ref={layerRef} widht={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Grid ownedLand={ownedLand} selectedLand={selectedLand} />
          {content.map((block, index) => {
            if (block.type === 'image') {
              return (
                <Img
                  name={`content img ${block.id}`}
                  id={block.id}
                  key={block.id}
                  x={block.x}
                  y={block.y}
                  width={block.width}
                  height={block.height}
                  rotation={block.rotation}
                  scaleX={block.scaleX}
                  scaleY={block.scaleY}
                  url={block.url}
                  fill={block.isDragging ? 'green' : 'black'}
                  draggable
                  onDragStart={(e) => {
                    const boxes = selectionTransformerRef.current
                      .nodes()
                      .map((node) => node.getClientRect())

                    const box = getTotalBox(boxes)

                    onImageDragStart(
                      e,
                      setContent,
                      index,
                      selectionTransformerRef,
                      setLastBlock,
                      box,
                      stageRef,

                      layerRef,
                    )
                  }}
                  onDragEnd={(e) =>
                    onImageDragEnd(e, setContent, index, setLastBlock)
                  }
                  onDragMove={(e) => {
                    const boxes = selectionTransformerRef.current
                      .nodes()
                      .map((node) => node.getClientRect())

                    const box = getTotalBox(boxes)
                    if (boxes.length <= 1) {
                      constrainDragBoundaries(
                        stageRef,
                        layerRef,
                        box,
                        e.target,
                        lastBlock,
                        setLastBlock,
                        isAllCoordinatesInOurLand,
                      )
                    }
                  }}
                  onTransformEnd={(e) => {
                    setContent((content) => {
                      const blockIndex = content.findIndex(
                        (block) => block.id === e.target.attrs.id,
                      )
                      content[blockIndex] = {
                        ...content[blockIndex],
                        rotation: e.target.attrs.rotation,
                        scaleX: e.target.attrs.scaleX,
                        scaleY: e.target.attrs.scaleY,
                        x: e.target.attrs.x,
                        y: e.target.attrs.y,
                      }
                    })
                  }}
                />
              )
            }
          })}
          <Rect
            name="selection"
            ref={selectionContainerRef}
            fill="rgba(0,0,255,0.5)"
            visible={false}
          />
          <Transformer
            ref={selectionTransformerRef}
            visible={!isSelectingLand}
            borderStrokeWidth={1}
            keepRatio={true}
            boundBoxFunc={(oldBox, newBox) =>
              constrainRotationBoundaries(
                stageRef,
                layerRef,
                oldBox,
                newBox,
                isAllCoordinatesInOurLand,
              )
            }
            onDragMove={(e) => {
              const boxes = selectionTransformerRef.current
                .nodes()
                .map((node) => node.getClientRect())
              const box = getTotalBox(boxes)
              selectionTransformerRef.current.nodes().forEach((shape) => {
                constrainDragBoundaries(
                  stageRef,
                  layerRef,
                  box,
                  shape,
                  lastBlock,
                  setLastBlock,
                  isAllCoordinatesInOurLand,
                )
              })
            }}
            flipEnabled={false}
            ignoreStroke={true}
            onTransform={() => {
              // disable flip
            }}
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
          />
          <Transformer
            ref={landTransformerRef}
            visible={false}
            rotateEnabled={false}
            resizeEnabled={false}
            borderStrokeWidth={2}
          />
        </Layer>
      </Stage>
      <LandManager
        landTransformerRef={landTransformerRef}
        stage={stageRef}
        layer={layerRef}
      />
    </>
  )
}
