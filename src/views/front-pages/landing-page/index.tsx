'use client'

// React Imports
import { useEffect } from 'react'

// Type Imports
import { Divider } from '@mui/material'

import type { Mode } from '@core/types'

// Component Imports
import HeroSection from './HeroSection'

import Leaders from './Leaders'

import ProductStat from './ProductStat'
import Faqs from './Faqs'

import ContactUs from './ContactUs'
import { useSettings } from '@core/hooks/useSettings'
import Activities from './Activities'
import AboutUs from './AboutUs'
import Managers from './Managers'
import Media from './Media'
import Players from './Players'
import Catchers from './Catchers'
import Outfielders from './Outfielders'
import Infielders from './Infielders'
import Pitchers from './Pitchers'

import TimelineCenter from './Timeline'
import Gallery from './Gallery'
import type { GalleryImage } from '@/types/imageTypes'

// import Recruitment from './RecruitmentDialog'

interface props {
  mode: Mode
  locale: string
  logoURL: string
  images: GalleryImage[]
}

const LandingPageWrapper = ({ mode, locale, logoURL, images }: props) => {
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
    <>
      {/* <Recruitment /> */}
      <HeroSection mode={mode} locale={locale} logoURL={logoURL} />
      <AboutUs locale={locale} />
      <TimelineCenter locale={locale} />
      <Divider />
      <ProductStat locale={locale} />
      <Leaders locale={locale} />
      <Managers locale={locale} />
      <Media locale={locale} />
      <Players locale={locale} />
      <Divider />
      <Pitchers locale={locale} />
      <Divider />
      <Catchers locale={locale} />
      <Divider />
      <Infielders locale={locale} />
      <Divider />
      <Outfielders locale={locale} />
      <Activities locale={locale} />
      {/* <Divider /> */}
      <Gallery images={images} locale={locale} logoURL={logoURL} />
      <Faqs locale={locale} />
      <ContactUs locale={locale} />
    </>
  )
}

export default LandingPageWrapper
