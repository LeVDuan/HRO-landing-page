// components/Gallery/GalleryIntro.tsx với nhiều tùy chỉnh hơn
import Image from 'next/image'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { styled } from '@mui/material/styles'

import { getFont } from '@/utils/getFont'

interface GalleryIntroProps {
  locale: string
  logoURL: string
}

const GalleryIntro = ({ locale, logoURL }: GalleryIntroProps) => {
  const t = useTranslations('gallery')

  const CustomTypography = styled('p')(() => ({
    fontFamily: getFont(locale)
  }))

  const hroFbLink = 'https://www.facebook.com/HUSTRedOwlsBaseballTeam'

  return (
    <div className='aspect-[3/4] w-full h-full rounded-lg overflow-hidden relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-red-800 to-red-950' />

      {/* Optional: Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <Image src={logoURL} alt='' fill priority sizes='bs-[250px]' className='object-cover' />
      </div>

      {/* Content */}
      <div className='relative h-full pt-6 pl-6 pr-6 pb-2 flex flex-col'>
        <div>
          {/* Logo */}
          <div className='mb-6 mt-2'>
            <Image src={logoURL} alt='Red Owls Logo' width={65} height={65} className='object-contain' />
          </div>

          {/* Text Content */}
          <CustomTypography className='sm:mb-4 text-xl font-bold text-white mb-4'>
            {t('gallery title')}
          </CustomTypography>
          <CustomTypography className='text-white/90 text-sm mb-4'>{t('gallery description')}</CustomTypography>
        </div>
        <div className='mt-auto'>
          <div className='flex justify-center gap-4 mb-3'>
            <Link
              href='/'
              className='px-4 py-2 bg-transparent border-2 border-white text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors'
            >
              {t('Home')}
            </Link>
            <Link
              href={hroFbLink}
              className='px-4 py-2 bg-white border-2 border-white text-black rounded-full text-sm font-medium hover:bg-white/10 hover:text-white transition-colors'
            >
              {t('Follow us')}
            </Link>
          </div>
          <div className='flex items-center gap-2 text-white/80'>
            <span className='w-8 h-0.5 bg-white/30 rounded-full' />
            <CustomTypography className='text-sm'>{`©${new Date().getFullYear()} HUST Red Owls`}</CustomTypography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryIntro
