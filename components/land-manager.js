import { useContext } from 'react'
import { LandContext, ContentContext } from 'context'
import { arrayIncludesArray } from 'helpers'

export const LandManager = ({ landTransformerRef, stage, layer }) => {
  const {
    ownedLand,
    setOwnedLand,
    isSelectingLand,
    setSelectingLand,
    selectedLand,
    setSelectedLand,
    isObjectInTheLand,
    isAllCoordinatesInOurLand,
    isInGivenLandByPos,
  } = useContext(LandContext)
  const { content, setContent } = useContext(ContentContext)

  // if all selected land is owned land -> let sell
  // if not -> let buy
  const isSelling = arrayIncludesArray(ownedLand, selectedLand)

  return (
    <>
      {ownedLand.length === 0 && selectedLand.length === 0 && (
        <Tooltip>Select some land to start</Tooltip>
      )}

      {!isSelectingLand && selectedLand.length === 0 && (
        <Button onClick={() => setSelectingLand(true)}>Modify land</Button>
      )}

      {isSelectingLand && ownedLand.length !== 0 && (
        <Button onClick={() => setSelectingLand(false)}>Cancel</Button>
      )}

      {selectedLand.length > 0 && !isSelling && (
        <Button
          style={{
            background: 'rgb(84 239 239)',
            color: 'black',
          }}
          onClick={() => {
            setOwnedLand((land) => [...land, ...selectedLand])
            setSelectedLand([])
            setSelectingLand(false)
          }}
        >
          Buy land
        </Button>
      )}

      {selectedLand.length > 0 && isSelling && (
        <Button
          style={{
            background: 'red',
            color: 'black',
          }}
          onClick={() => {
            const scale = stage.current.scale()

            let any = false
            stage.current.find('.content').map((shape) => {
              // 1. get absolute positions of shapes
              // 2. get absolute positions of all selected land
              // 3. if any of shape corners is in selected land - prohibit
              // 4. else - let sell

              // absolute position/dimensions
              var box = shape.getClientRect({ relativeTo: layer.current })

              const absPos = shape.getAbsolutePosition()
              const offsetX = box.x - absPos.x
              const offsetY = box.y - absPos.y

              const x1 = box.x
              const y1 = box.y
              const x2 = box.x + box.width
              const y2 = box.y + box.height

              const x1Index = Math.floor(x1 / 600)
              const y1Index = Math.floor(y1 / 600)
              const x2Index = Math.ceil(x2 / 600)
              const y2Index = Math.ceil(y2 / 600)

              const xDiff = x2Index - x1Index
              const yDiff = y2Index - y1Index

              let allCordinates = []

              const res = [...Array(xDiff)].map((_, xi) => {
                let xx = x1Index + xi
                const res2 = [...Array(yDiff)].map((_, yi) => {
                  let yy = y1Index + yi

                  allCordinates.push(`[${xx},${yy}]`)
                })
              })

              if (selectedLand.some((l) => allCordinates.indexOf(l) > -1)) {
                // isOutside = true
                any = true
              }
              console.log('000')
              console.log(selectedLand)
              console.log(allCordinates)
            })

            if (any) {
              alert(
                'You got blocks inside this land. Please move or remove blocks first',
              )
            } else {
              // alert('ok')
              setOwnedLand((land) =>
                land.filter((l) => selectedLand.indexOf(l) < 0),
              )
              setSelectedLand([])
              setSelectingLand(false)
            }
          }}
        >
          Sell land
        </Button>
      )}
    </>
  )
}

const Button = ({ children, onClick, className = ' ', style = {} }) => (
  <button
    className={
      `
      fixed
      bottom-8
      right-12
      px-8 py-4 
      font-semibold
      text-xl
      bg-black
      rounded-md
      bg-opacity-30
      hover:bg-opacity-40
      hover:shadow-lg
      text-slate-300
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    ` + className
    }
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
)

const Tooltip = ({ children }) => (
  <div
    className={`
      fixed
      bottom-8
      right-12
      px-8 py-4 
      font-semibold
      text-md
      rounded-md
      bg-opacity-30
      hover:bg-opacity-40
      hover:shadow-lg
      text-slate-300
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    `}
  >
    {children}
  </div>
)

export default LandManager
