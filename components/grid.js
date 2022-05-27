import { Fragment, useContext } from 'react'
import { LandContext } from 'context'
import { Rect } from 'react-konva'
import { COLUMNS_COUNT, ROWS_COUNT, CELL_WIDTH, CELL_HEIGHT } from 'constants'

export const Grid = ({ ownedLand, selectedLand }) => {
  return (
    <>
      {new Array(ROWS_COUNT).fill(undefined).map((_, x) => {
        return (
          <Fragment key={`row-${x}`}>
            {new Array(COLUMNS_COUNT).fill(undefined).map((_, y) => {
              const id = `[${x},${y}]`
              const isMyBlock = ownedLand.findIndex((i) => i === id) > -1
              const isSelectedLand =
                selectedLand.findIndex((i) => i === id) > -1

              return (
                <Rect
                  name={`grid land ${id} ${isMyBlock ? 'my-block' : ''} ${
                    isSelectedLand ? 'selected-land' : ''
                  }`}
                  id={id}
                  key={id}
                  x={CELL_WIDTH * x}
                  y={CELL_HEIGHT * y}
                  width={CELL_WIDTH}
                  height={CELL_HEIGHT}
                  stroke={
                    isSelectedLand && isMyBlock
                      ? 'red'
                      : isSelectedLand
                      ? 'white'
                      : isMyBlock
                      ? '#1cdbdb'
                      : 'rgba(255,255,255,0.5)'
                  }
                  strokeWidth={isMyBlock || isSelectedLand ? 5 : 0.5}
                />
              )
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default Grid
