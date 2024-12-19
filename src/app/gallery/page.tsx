// app/gallery/page.tsx
import { v2 as cloudinary } from 'cloudinary'

import Gallery from '@views/gallery/index'
import type { GalleryImage } from '@/types/imageTypes'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

const getImages = async (): Promise<GalleryImage[]> => {
  try {
    const results = await cloudinary.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by('created_at', 'desc')
      .with_field('context')
      .max_results(200)
      .execute()

    const reducedResults: GalleryImage[] = []

    let i: number = 0

    for (const result of results.resources) {
      reducedResults.push({
        id: i,
        height: result.height,
        width: result.width,
        public_id: result.public_id,
        format: result.format
      })
      i++
    }

    const blurImagePromises = results.resources.map((image: GalleryImage) => {
      return getBase64ImageUrl(image)
    })

    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
      reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }
  } catch (error) {
    console.error('Error fetching images:', error)

    return []
  }
}

export default async function GalleryPage() {
  const images = await getImages()

  return <Gallery images={images} />
}
