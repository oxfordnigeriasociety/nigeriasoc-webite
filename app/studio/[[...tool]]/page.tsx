'use client'
import dynamic from 'next/dynamic'
import config from '../../../sanity.config'
import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const dynamicParams = true

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage({ params }: { params: Promise<{ tool?: string[] }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  useEffect(() => {
    if (!resolvedParams?.tool?.length) {
      router.replace('/studio/structure')
    }
  }, [resolvedParams, router])

  return <NextStudio config={config} />
} 