import { useEffect, useState } from 'react'
import { builder, BuilderComponent } from '@builder.io/react'

// Initialize Builder with your public API key
builder.init(import.meta.env.VITE_BUILDER_API_KEY!) // or hardcode for testing

export default function Embed() {
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    builder
      .get('page', { url: '/embed' }) // Match this with your Builder page URL
      .toPromise()
      .then((data) => setContent(data))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <p>Loading Builder content...</p>
      )}
    </div>
  )
}
