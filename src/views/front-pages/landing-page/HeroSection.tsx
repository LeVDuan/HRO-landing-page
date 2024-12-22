// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

import { styled } from '@mui/material/styles'

// MUI Imports
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { useTranslations } from 'next-intl'

import Typography from '@mui/material/Typography'

import type { Mode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'
import { getFont } from '@/utils/getFont'

interface props {
  mode: Mode
  locale: string
  logoURL: string
}

const HeroSection = ({ mode, locale, logoURL }: props) => {
  // States
  const [dashboardPosition, setDashboardPosition] = useState({ x: 0, y: 0 })
  const [elementsPosition, setElementsPosition] = useState({ x: 0, y: 0 })
  const t = useTranslations('heroSection')

  const CustomTypography = styled(Typography)(() => ({
    fontFamily: getFont(locale)
  }))

  // Vars
  const dashboardImageLight = '/landing-page/hero.jpg'
  const dashboardImageDark = '/landing-page/hero.jpg'

  const elementsImageLight =
    logoURL === '/logos/LogoXmas.png'
      ? '/landing-page/hero-elements-light-xmas.png'
      : '/landing-page/hero-elements-light.png'

  const elementsImageDark =
    logoURL === '/logos/LogoXmas.png'
      ? '/landing-page/hero-elements-light-xmas.png'
      : '/landing-page/hero-elements-light.png'

  const heroSectionBgLight = '/landing-page/hero-bg-light.png'
  const heroSectionBgDark = '/landing-page/hero-bg-dark.png'
  const hroFbLink = 'https://www.facebook.com/HUSTRedOwlsBaseballTeam'

  // Hooks
  const dashboardImage = useImageVariant(mode, dashboardImageLight, dashboardImageDark)
  const elementsImage = useImageVariant(mode, elementsImageLight, elementsImageDark)
  const heroSectionBg = useImageVariant(mode, heroSectionBgLight, heroSectionBgDark)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const speedDashboard = 2
      const speedElements = 2.5

      const updateMousePosition = (ev: MouseEvent) => {
        const x = ev.clientX
        const y = ev.clientY

        setDashboardPosition({
          x: (window.innerWidth - x * speedDashboard) / 100,
          y: Math.max((window.innerHeight - y * speedDashboard) / 100, -40)
        })

        setElementsPosition({
          x: (window.innerWidth - x * speedElements) / 100,
          y: Math.max((window.innerHeight - y * speedElements) / 100, -40)
        })
      }

      window.addEventListener('mousemove', updateMousePosition)

      return () => {
        window.removeEventListener('mousemove', updateMousePosition)
      }
    }
  }, [])

  return (
    <section id='home' className='relative overflow-hidden pbs-[70px] -mbs-[80px] bg-backgroundPaper z-[1]'>
      <img src={heroSectionBg} alt='hero-bg' className={styles.heroSectionBg} />
      <div className={classnames('pbs-16 overflow-hidden', frontCommonStyles.layoutSpacing)}>
        <div className='md:max-is-[700px] mlb-0 mli-auto text-center'>
          <Typography className={styles.heroText}>HUST RED OWLS </Typography>
          <Typography variant='h4' className='font-semibold mbe-4 leading-[34px]'>
            #WEAREHRO
          </Typography>
          <CustomTypography className='font-medium' color='text.primary'>
            {t('text1')}
          </CustomTypography>
          <CustomTypography className='font-medium' color='text.primary'>
            {t('text2')}
          </CustomTypography>
          <CustomTypography className='font-medium' color='text.primary'>
            {t('text3')}
          </CustomTypography>
          <CustomTypography className='font-medium' color='text.primary'>
            {t('text4')}
          </CustomTypography>
          <CustomTypography className='font-medium' color='text.primary'>
            {t('text5')}
          </CustomTypography>
          <div className='mbs-8'>
            <Button
              component={Link}
              href={hroFbLink}
              target='_blank'
              variant='contained'
              color='primary'
              size='large'
              sx={{ mb: '2rem', fontFamily: `${getFont(locale)}` }}
              className={classnames(styles.heroButton)}
            >
              {t('Follow us')}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={classnames('relative text-center', frontCommonStyles.layoutSpacing)}
        style={{ transform: `translate(${dashboardPosition.x}px, ${dashboardPosition.y}px)` }}
      >
        <img
          src={dashboardImage}
          alt='HRO-image'
          className={classnames('mli-auto w-3/4 rounded-xl', styles.heroSecDashboard)}
        />
        <div className={classnames('absolute', styles.heroSectionElements)}>
          <img
            src={elementsImage}
            alt='Hoo-Lauu-elements'
            style={{ transform: `translate(${elementsPosition.x}px, ${elementsPosition.y}px)` }}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
