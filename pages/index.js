import dynamic from 'next/dynamic'

const CanvasProvider = dynamic(() => import('../context/canvas'), {
  ssr: false,
})
const ContentProvider = dynamic(() => import('../context/content'), {
  ssr: false,
})
const LandProvider = dynamic(() => import('../context/land'), { ssr: false })
const Canvas = dynamic(() => import('../components/canvas'), { ssr: false })

export default function Home() {
  return (
    <div
      className="bg-gradient-to-r from-sky-400 to-indigo-500"
      style={{
        backgroundImage: 'linear-gradient(to right, #0b0b0c, #16162e)',
      }}
    >
      <CanvasProvider>
        <LandProvider>
          <ContentProvider>
            <Canvas />
          </ContentProvider>
        </LandProvider>
      </CanvasProvider>
      <style global jsx>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
