import 'server-only'

// Next Imports
import { cookies, headers } from 'next/headers'

// Type Imports
import Lunar from 'lunar-javascript'

import type { Settings } from '@core/contexts/settingsContext'
import type { DemoName, SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import demoConfigs from '@configs/demoConfigs'

export const getDemoName = (): DemoName => {
  const headersList = headers()

  return headersList.get('X-server-header') as DemoName | null
}

export const getSettingsFromCookie = (): Settings => {
  const cookieStore = cookies()

  const demoName = getDemoName()

  const cookieName = demoName
    ? themeConfig.settingsCookieName.replace('demo-1', demoName)
    : themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie()

  const demoName = getDemoName()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || (demoName && demoConfigs[demoName].mode) || themeConfig.mode

  return _mode
}

export const getSystemMode = (): SystemMode => {
  const cookieStore = cookies()
  const mode = getMode()

  const colorPrefCookie = (cookieStore.get('colorPref')?.value || 'light') as SystemMode

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}

export const getServerMode = () => {
  const mode = getMode()
  const systemMode = getSystemMode()

  return mode === 'system' ? systemMode : mode
}

export const getUserLocaleFromCookies = () => {
  const cookieStore = cookies()

  return cookieStore.get('NEXT_LOCALE')?.value || 'vi'
}

export const getSkin = () => {
  const settingsCookie = getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}

export const getEventImageUrl = (): string => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const events = [
    {
      name: 'christmas',
      date: new Date(currentYear, 11, 25),
      daysBefore: 15,
      daysAfter: 15,
      imageUrl: '/logos/LogoXmas.png'
    },
    {
      name: 'halloween',
      date: new Date(currentYear, 9, 31),
      daysBefore: 7,
      daysAfter: 7,
      imageUrl: '/logos/LogoHalloween.png'
    },
    {
      name: 'tet',
      dateFn: () => getTetLunarDate(currentYear),
      daysBefore: 7,
      daysAfter: 21,
      imageUrl: '/logos/Logo.png' // chưa có ảnh để thêm
    }
  ]

  for (const event of events) {
    let eventDate: Date | null = null

    if (event.date) {
      eventDate = event.date
    } else if (event.dateFn) {
      eventDate = event.dateFn()
    }

    if (eventDate) {
      const startDate = new Date(eventDate)

      startDate.setDate(eventDate.getDate() - event.daysBefore)
      const endDate = new Date(eventDate)

      endDate.setDate(eventDate.getDate() + event.daysAfter)

      if (currentDate >= startDate && currentDate <= endDate) {
        return event.imageUrl
      }
    }
  }

  return '/logos/Logo.png'
}

const getTetLunarDate = (year: number): Date | null => {
  try {
    const lunarDate = Lunar.fromDate(new Date(year, 0, 1))
    const tetDate = lunarDate.getTetDate()

    return new Date(tetDate.getFullYear(), tetDate.getMonth() - 1, tetDate.getDate())
  } catch (error) {
    console.error('Lunar new year error:', error)

    return null
  }
}
