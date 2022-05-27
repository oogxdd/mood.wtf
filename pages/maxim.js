import dynamic from 'next/dynamic'
import { maximContent } from 'data/maxim'

const Canvas = dynamic(() => import('../components/canvas'), { ssr: false })

const ContentProvider = dynamic(() => import('../context/content'), {
  ssr: false,
})
const CanvasProvider = dynamic(() => import('../context/canvas'), {
  ssr: false,
})

export default function Home() {
  return (
    <div
      className="bg-gradient-to-r from-sky-400 to-indigo-500"
      style={{
        backgroundImage: 'linear-gradient(to right, #0b0b0c, #16162e)',
      }}
    >
      <ContentProvider initialData={maximContent}>
        <CanvasProvider>
          <Canvas />
        </CanvasProvider>
      </ContentProvider>
      <style global jsx>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
