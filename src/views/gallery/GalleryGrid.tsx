// components/Gallery/GalleryGrid.tsx
import { useState } from 'react'

import type { GalleryImage } from '@/types/imageTypes'
import GalleryImageComponent from './GalleryImage'
import Modal from './GalleryModal'
import GalleryIntro from './GalleryIntro'

interface Props {
  images: GalleryImage[]
  locale: string
  logoURL: string
}

const GalleryGrid = ({ images, locale, logoURL }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <div className='sm:row-span-2 sm:col-span-1'>
            <GalleryIntro locale={locale} logoURL={logoURL} />
          </div>
          {images.map(image => (
            <div key={image.id} className='aspect-[3/2] w-full overflow-hidden rounded-lg'>
              <GalleryImageComponent image={image} onClick={() => setSelectedIndex(image.id)} logoURL={logoURL} />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <Modal
          images={images}
          currentImage={images[selectedIndex]}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  )
}

export default GalleryGrid
