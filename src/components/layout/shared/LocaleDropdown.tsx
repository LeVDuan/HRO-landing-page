'use client'

// React Imports
import { useRef, useState } from 'react'

import { Noto_Serif_JP, Noto_Serif_KR } from 'next/font/google'

import { useLocale, useTranslations } from 'next-intl'

// MUI Imports

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

import type { Locale } from '@/configs/localeConfig'

import { setUserLocale } from '@/services/locale'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900']
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900']
})

const LocaleDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const currLocale = useLocale()
  const t = useTranslations('dropMenu')

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)

  // Hooks
  const { settings } = useSettings()

  const handleClose = () => {
    setOpen(false)
    setTooltipOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleLocaleSwitch = async (value: string) => {
    handleClose()

    if (currLocale !== value) {
      setUserLocale(value as Locale)
    }
  }

  return (
    <>
      <Tooltip
        title={t('Change language')}
        onOpen={() => setTooltipOpen(true)}
        onClose={() => setTooltipOpen(false)}
        open={open ? false : tooltipOpen ? true : false}
        PopperProps={{ className: 'capitalize' }}
      >
        <IconButton ref={anchorRef} onClick={handleToggle} className='!text-textPrimary'>
          <i className='ri-translate-2' />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-start'
        anchorEl={anchorRef.current}
        className='min-is-[160px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  <MenuItem className='gap-3' onClick={() => handleLocaleSwitch('vi')} selected={currLocale === 'vi'}>
                    Tiếng Việt
                  </MenuItem>
                  <MenuItem className='gap-3' onClick={() => handleLocaleSwitch('en')} selected={currLocale === 'en'}>
                    English
                  </MenuItem>
                  <MenuItem
                    className='gap-3'
                    sx={{ fontFamily: `${notoSerifJP.style.fontFamily}` }}
                    onClick={() => handleLocaleSwitch('ja')}
                    selected={currLocale === 'ja'}
                  >
                    日本語
                  </MenuItem>
                  <MenuItem
                    className='gap-3'
                    sx={{ fontFamily: `${notoSerifKR.style.fontFamily}` }}
                    onClick={() => handleLocaleSwitch('ko')}
                    selected={currLocale === 'ko'}
                  >
                    한국어
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default LocaleDropdown
