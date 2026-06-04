'use client'
import { Studio } from 'sanity'
import config from '../sanity.config'

export default function SanityStudioComponent() {
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={config} />
    </div>
  )
}
