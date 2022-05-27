import React from 'react'
import { Image } from 'react-konva'
import 'gifler'

export const Gif = ({ src, ...props }) => {
  const imageRef = React.useRef(null)
  const canvas = React.useMemo(() => {
    const node = document.createElement('canvas')
    // const node = document.getElementsByTagName('canvas')[0]
    return node
  }, [])

  React.useEffect(() => {
    // save animation instance to stop it on unmount
    let anim
    window.gifler(src).get((a) => {
      anim = a
      anim.animateInCanvas(canvas)
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y)
        imageRef.current.getLayer().draw()
      }
    })
    return () => anim && anim.stop()
  }, [src, canvas])

  return <Image image={canvas} ref={imageRef} {...props} />
}

// if (block.type === 'gif') {
//   return (
//     <Gif
//       src={block.url}
//       name={`content img ${block.id}`}
//       id={block.id}
//       key={block.id}
//       x={block.x}
//       y={block.y}
//       rotation={block.rotation}
//       scaleX={block.scaleX}
//       scaleY={block.scaleY}
//       draggable
//       onDragStart={(e) =>
//         onImageDragStart(
//           e,
//           setContent,
//           index,
//           selectionTransformerRef,
//         )
//       }
//       onDragEnd={(e) => onImageDragEnd(e, setContent, index)}
//       onDragMove={(e) => {
//         const boxes = selectionTransformerRef.current
//           .nodes()
//           .map((node) => node.getClientRect())

//         const box = getTotalBox(boxes)
//         constrainDragBoundaries(
//           stageRef,
//           landTransformerRef,
//           box,
//           e.target,
//         )
//       }}
//       onTransformEnd={(e) => {
//         setContent((content) => {
//           const blockIndex = content.findIndex(
//             (block) => block.id === e.target.attrs.id,
//           )
//           content[blockIndex] = {
//             ...content[blockIndex],
//             rotation: e.target.attrs.rotation,
//             scaleX: e.target.attrs.scaleX,
//             scaleY: e.target.attrs.scaleY,
//             x: e.target.attrs.x,
//             y: e.target.attrs.y,
//           }
//         })
//         // e.target.attrs.id
//       }}
//     />
//   )
//   return (
//     <Gif
//       name={`content img ${block.id}`}
//       id={block.id}
//       key={block.id}
//       x={block.x}
//       y={block.y}
//       rotation={block.rotation}
//       scaleX={block.scaleX}
//       scaleY={block.scaleY}
//       url={block.url}
//       fill={block.isDragging ? 'green' : 'black'}
//       draggable
//       onDragStart={(e) =>
//         onImageDragStart(
//           e,
//           setContent,
//           index,
//           selectionTransformerRef,
//         )
//       }
//       onDragEnd={(e) => onImageDragEnd(e, setContent, index)}
//       onDragMove={(e) => {
//         const boxes = selectionTransformerRef.current
//           .nodes()
//           .map((node) => node.getClientRect())

//         const box = getTotalBox(boxes)
//         constrainDragBoundaries(
//           stageRef,
//           landTransformerRef,
//           box,
//           e.target,
//         )
//       }}
//       onTransformEnd={(e) => {
//         setContent((content) => {
//           const blockIndex = content.findIndex(
//             (block) => block.id === e.target.attrs.id,
//           )
//           content[blockIndex] = {
//             ...content[blockIndex],
//             rotation: e.target.attrs.rotation,
//             scaleX: e.target.attrs.scaleX,
//             scaleY: e.target.attrs.scaleY,
//             x: e.target.attrs.x,
//             y: e.target.attrs.y,
//           }
//         })
//         // e.target.attrs.id
//       }}
//     />
//   )
// }
