'use client'

// React Imports
import { useState } from 'react'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

// Next Imports

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports

import type { Mode } from '@core/types'

// Component Imports
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import FrontMenu from './FrontMenu'
import CustomIconButton from '@core/components/mui/IconButton'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import LocaleDropdown from '../shared/LocaleDropdown'
import { getFont } from '@/utils/getFont'

interface props {
  mode: Mode
  locale: string
  logoURL: string
}

const Header = ({ mode, locale, logoURL }: props) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const t = useTranslations('header')

  // Hooks
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  return (
    <header className={classnames(frontLayoutClasses.header, styles.header)}>
      <div className={classnames(frontLayoutClasses.navbar, styles.navbar, { [styles.headerScrolled]: trigger })}>
        <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
          {isBelowLgScreen ? (
            <div className='flex items-center gap-2 sm:gap-4'>
              <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                <i className='ri-menu-line text-textPrimary' />
              </IconButton>
              <Link href='/'>
                <img src={logoURL} alt='HRO Logo' className='bs-[45px]' />
              </Link>
              <FrontMenu mode={mode} locale={locale} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          ) : (
            <div className='flex items-center gap-10'>
              <Link href='/'>
                <img src={logoURL} alt='HRO Logo' className='bs-[45px]' />
              </Link>
              <FrontMenu mode={mode} locale={locale} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
          <div className='flex items-center gap-2 sm:gap-4'>
            <LocaleDropdown />
            <ModeDropdown locale={locale} />
            {isBelowLgScreen ? (
              <CustomIconButton
                component={Link}
                variant='contained'
                href='https://www.facebook.com/HUSTRedOwlsBaseballTeam'
                color='primary'
                target='_blank'
                className={classnames(styles.button)}
              >
                <i className='ri-facebook-circle-fill text-xl' />
                <span className={styles.buttonInner} />
              </CustomIconButton>
            ) : (
              <Button
                component={Link}
                variant='contained'
                href='https://www.facebook.com/HUSTRedOwlsBaseballTeam'
                target='_blank'
                startIcon={<i className='ri-facebook-circle-fill text-xl' />}
                sx={{ fontFamily: `${getFont(locale)}` }}
                className={classnames('whitespace-nowrap', styles.button)}
              >
                {t('Follow')}
                <span className={styles.buttonInner} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
