import { createContext, useState, useEffect } from 'react'
import { useImmer } from 'use-immer'

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  COLUMNS_COUNT,
  ROWS_COUNT,
  CELL_WIDTH,
  CELL_HEIGHT,
} from 'constants'

const CanvasContext = createContext()

const CanvasProvider = ({ children }) => {
  const [scale, setScale] = useState({
    x: 0.17,
    y: 0.17,
  })

  const [position, setPosition] = useState({
    x: (STAGE_WIDTH - CELL_WIDTH * scale.x * COLUMNS_COUNT) / 2,
    y: (STAGE_HEIGHT - CELL_HEIGHT * scale.y * ROWS_COUNT) / 2,
  })

  const [selectionCoordinates, setSelectionCoordinates] = useState({})

  return (
    <CanvasContext.Provider
      value={{
        scale,
        setScale,
        position,
        setPosition,
        selectionCoordinates,
        setSelectionCoordinates,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export { CanvasProvider as default, CanvasContext }
