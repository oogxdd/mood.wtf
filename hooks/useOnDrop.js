import { useEffect } from 'react'

export const useOnDrop = ({ canDrop, onDrop, onDropFail }) => {
  useEffect(() => {
    const func = (e) => {
      e.preventDefault()
      if (canDrop) {
        onDrop(e)
      } else {
        onDropFail()
      }
    }

    document.addEventListener('drop', func, false)
    return () => document.removeEventListener('drop', func)
  }, [canDrop])
}
