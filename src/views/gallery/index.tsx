'use client'

// React Imports
import { useEffect } from 'react'

import GalleryGrid from './GalleryGrid'
import type { GalleryImage } from '@/types/imageTypes'

// import './styles.module.css'

// Component Imports
import { useSettings } from '@core/hooks/useSettings'

interface GalleryWrapperProps {
  images: GalleryImage[]
  locale: string
  logoURL: string
}

const GalleryWrapper = ({ images, locale, logoURL }: GalleryWrapperProps) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <GalleryGrid images={images} locale={locale} logoURL={logoURL} />
    </div>
  )
}

export default GalleryWrapper
