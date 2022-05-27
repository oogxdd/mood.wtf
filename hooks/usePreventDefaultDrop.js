import { useEffect } from 'react'

// disable default behaviour on image drop
// (where it's being opened in new tab in browser)
export const usePreventDefaultDrop = () => {
  useEffect(() => {
    const onDragOver = (event) => event.preventDefault()
    document.addEventListener('dragover', onDragOver)
    return () => document.removeEventListener('dragover', onDragOver)
  }, [])
}
