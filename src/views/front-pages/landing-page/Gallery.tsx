// React Imports
import { useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

import { useTranslations } from 'next-intl'

import { useIntersection } from '@/hooks/useIntersection'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import { getFont } from '@/utils/getFont'
import type { GalleryImage } from '@/types/imageTypes'
import GalleryForImage from '@/views/gallery/GalleryImage'
import Link from '@/components/Link'

interface GalleryProps {
  locale: string
  images: GalleryImage[]
  logoURL: string
}

const Gallery = ({ locale, images, logoURL }: GalleryProps) => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)
  const t = useTranslations('gallery')
  const router = useRouter()

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='activities' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 pb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Typography
              component={Link}
              target='_blank'
              href='/gallery'
              variant='h4'
              className='font-bold'
              sx={{ fontFamily: `${getFont(locale)}` }}
            >
              <span className='relative z-[1] font-extrabold'>
                👉{t('Save memorable moments')}👈
                <img
                  src='/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                />
              </span>{' '}
            </Typography>
          </div>
        </div>
        <div>
          <Grid container columnSpacing={6} rowSpacing={6}>
            {images.map(image => (
              <Grid item xs={12} sm={6} lg={4} key={image.id}>
                <div className='aspect-[3/2] w-full overflow-hidden rounded-lg'>
                  <GalleryForImage
                    image={image}
                    logoURL={logoURL}
                    onClick={() => {
                      router.push('/gallery')
                    }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default Gallery
