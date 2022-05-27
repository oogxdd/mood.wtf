import { createContext, useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { arrayIncludesArray } from 'helpers'

const LandContext = createContext()

const LandProvider = ({ children }) => {
  const [ownedLand, setOwnedLand] = useState(
    window.localStorage.land ? JSON.parse(window.localStorage.land) : [],
  )
  const [selectedLand, setSelectedLand] = useState([])

  const [isSelectingLand, setSelectingLand] = useState(ownedLand.length === 0)

  useEffect(() => {
    window.localStorage.setItem('land', JSON.stringify(ownedLand))
  }, [ownedLand])

  const isOurLandByPos = (x, y) => {
    const column = Math.floor(y / 600)
    const row = Math.floor(x / 600)

    let id = `[${row},${column}]`

    return ownedLand.indexOf(id) > -1
  }

  const isOurLandByIndex = (xInd, yInd) => {
    const id = `[${xInd},${yInd}]`

    return ownedLand.indexOf(id) > -1
  }

  const isAllCoordinatesInOurLand = (x1, y1, x2, y2) => {
    let answer = true
    if (!isOurLandByPos(x1, y1)) answer = false
    if (!isOurLandByPos(x2, y1)) answer = false
    if (!isOurLandByPos(x1, y2)) answer = false
    if (!isOurLandByPos(x2, y2)) answer = false
    return answer
  }

  //   const isObjectInTheLand = (x1, y1, x2, y2) => {
  //     return isAllCoordinatesInOurLand(x1, y1, x2, y2)
  //   }

  const isObjectInTheLand = (objectCoordinates, landCoordinates) => {
    const objectLand = [
      `[${Math.floor(objectCoordinates.x1 / 600)},${Math.floor(
        objectCoordinates.y1 / 600,
      )}]`,
      `[${Math.floor(objectCoordinates.x2 / 600)},${Math.floor(
        objectCoordinates.y1 / 600,
      )}]`,
      `[${Math.floor(objectCoordinates.x1 / 600)},${Math.floor(
        objectCoordinates.y2 / 600,
      )}]`,
      `[${Math.floor(objectCoordinates.x2 / 600)},${Math.floor(
        objectCoordinates.y2 / 600,
      )}]`,
    ]

    return arrayIncludesArray(objectLand, selectedLand)
  }

  const isInGivenLandByPos = (x, y, land) => {
    const column = Math.floor(y / 600)
    const row = Math.floor(x / 600)

    let id = `[${row},${column}]`
    return land.indexOf(id) > -1
  }

  return (
    <LandContext.Provider
      value={{
        isSelectingLand,
        setSelectingLand,
        ownedLand,
        setOwnedLand,
        isOurLandByPos,
        isOurLandByIndex,
        selectedLand,
        setSelectedLand,
        isAllCoordinatesInOurLand,
        isObjectInTheLand,
        isInGivenLandByPos,
      }}
    >
      {children}
    </LandContext.Provider>
  )
}

export { LandProvider, LandContext }

export default LandProvider
