// components/Gallery/GalleryImage.tsx
import Image from 'next/image'

import type { GalleryImage } from '@/types/imageTypes'

interface Props {
  image: GalleryImage
  logoURL: string
  onClick: () => void
}

const GalleryForImage = ({ image, logoURL, onClick }: Props) => {
  const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_800/${image.public_id}.${image.format}`

  return (
    <div onClick={onClick} className='relative w-full rounded-lg h-full cursor-pointer group'>
      <Image
        src={url}
        alt=''
        placeholder='blur'
        blurDataURL={image.blurDataUrl}
        fill
        priority
        className='object-cover transition-transform duration-300 group-hover:scale-110'
        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
      />

      {/* Overlay với logo khi hover */}
      <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300'>
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='relative w-20 h-20'>
            {/* Điều chỉnh kích thước logo tại đây */}
            <Image src={logoURL} alt='Club Logo' priority fill className='object-contain' sizes='bs-250px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryForImage
