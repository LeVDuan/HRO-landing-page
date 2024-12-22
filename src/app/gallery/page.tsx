import dynamic from 'next/dynamic'

const Snowfall = dynamic(() => import('@views/front-pages/landing-page/Snowfall'), { ssr: false })

import cloudinary from '@/utils/cloudinary'
import Gallery from '@views/gallery/index'
import type { GalleryImage } from '@/types/imageTypes'
import getBase64ImageUrl from '@/utils/generateBlurPlaceholder'
import { getEventImageUrl, getUserLocaleFromCookies } from '@core/utils/serverHelpers'

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

    return reducedResults
  } catch (error) {
    console.error('Error fetching images:', error)

    return []
  }
}

export default async function GalleryPage() {
  const images = await getImages()
  const locale = getUserLocaleFromCookies()
  const logoURL = getEventImageUrl()

  return (
    <>
      {logoURL === '/logos/LogoXmas.png' ? <Snowfall /> : null}
      <Gallery images={images} locale={locale} logoURL={logoURL} />
    </>
  )
}
