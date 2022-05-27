import { useEffect } from 'react'

export const useOnBackspace = ({ onBackspace }) => {
  useEffect(() => {
    const func = (e) => {
      if (e.key === 'Backspace') {
        onBackspace(e)
      }
    }

    document.addEventListener('keydown', onBackspace, false)
    return () => document.removeEventListener('keydown', onBackspace)
  }, [])
}
