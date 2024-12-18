// components/Gallery/Modal.tsx
'use client'

import { useCallback, useEffect, useRef } from 'react'

import Image from 'next/image'

import type { GalleryImage } from '@/types/imageTypes'

interface ModalProps {
  images: GalleryImage[]
  currentImage: GalleryImage
  onClose: () => void
  onNavigate: (index: number) => void
  currentIndex: number
}

const Modal = ({ images, currentImage, onClose, onNavigate, currentIndex }: ModalProps) => {
  const previewStripRef = useRef<HTMLDivElement>(null)
  const selectedPreviewRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
    },
    [onClose, onNavigate, currentIndex, images.length]
  )

  // Scroll selected preview into view
  useEffect(() => {
    if (selectedPreviewRef.current && previewStripRef.current) {
      const strip = previewStripRef.current
      const selected = selectedPreviewRef.current
      const stripWidth = strip.offsetWidth
      const selectedWidth = selected.offsetWidth

      // Calculate scroll position to center the selected preview
      const scrollPosition = selected.offsetLeft - stripWidth / 2 + selectedWidth / 2

      strip.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${currentImage.width}/${currentImage.id}.${currentImage.format}`
  const blurUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${currentImage.width},e_blur:1000/${currentImage.id}.${currentImage.format}`

  return (
    <div className='fixed inset-0 z-50' onClick={onClose}>
      {/* Blurred background */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-xl opacity-50'
        style={{ backgroundImage: `url(${blurUrl})` }}
      />

      <div className='absolute inset-0 bg-black/30' />

      {/* Content */}
      <div className='relative h-full flex flex-col justify-between' onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className='flex justify-between items-center p-4 text-white'>
          <span className='text-sm'>
            {currentIndex + 1} / {images.length}
          </span>
          <button onClick={onClose} className='p-2 hover:bg-white/10 rounded-full transition-colors'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Main Image */}
        <div className='flex-1 flex items-center justify-center relative px-4'>
          {currentIndex > 0 && (
            <button
              onClick={e => {
                e.stopPropagation()
                onNavigate(currentIndex - 1)
              }}
              className='absolute left-8 p-2 text-white hover:bg-white/10 rounded-full transition-colors'
            >
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </button>
          )}

          <div className='relative h-[70vh] w-full max-w-6xl'>
            <Image src={url} alt='' fill className='object-contain' priority sizes='100vw' />
          </div>

          {currentIndex < images.length - 1 && (
            <button
              onClick={e => {
                e.stopPropagation()
                onNavigate(currentIndex + 1)
              }}
              className='absolute right-8 p-2 text-white hover:bg-white/10 rounded-full transition-colors'
            >
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>
          )}
        </div>

        {/* Preview Strip */}
        <div className='p-4'>
          <div
            ref={previewStripRef}
            className='flex gap-2 justify-start overflow-x-auto px-4 max-w-full scroll-smooth'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => {
              const previewUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_200/${image.id}.${image.format}`
              const isSelected = index === currentIndex

              return (
                <button
                  key={image.id}
                  ref={isSelected ? selectedPreviewRef : null}
                  onClick={e => {
                    e.stopPropagation()
                    onNavigate(index)
                  }}
                  className={`
                    relative w-20 h-20 flex-shrink-0 transition-all duration-200
                    ${isSelected ? 'opacity-100 ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}
                  `}
                >
                  <Image src={previewUrl} alt='' fill className='object-cover' sizes='80px' />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
