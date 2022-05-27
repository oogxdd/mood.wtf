import { createContext, useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { initialContent } from 'data'

const ContentContext = createContext()

const ContentProvider = ({ children, data }) => {
  const [content, setContent] = useImmer(
    data
      ? data
      : window.localStorage.blocks
      ? JSON.parse(window.localStorage.blocks)
      : initialContent,
  )
  useEffect(() => {
    window.localStorage.setItem('blocks', JSON.stringify(content))
  }, [content])

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export { ContentProvider as default, ContentContext }
