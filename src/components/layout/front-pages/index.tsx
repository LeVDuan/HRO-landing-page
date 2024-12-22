// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Footer from '@components/layout/front-pages/Footer'
import Header from '@components/layout/front-pages/Header'

// Server Action Imports
import { getServerMode, getUserLocaleFromCookies, getEventImageUrl } from '@core/utils/serverHelpers'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

const FrontLayout = ({ children }: ChildrenType) => {
  // Vars
  const mode = getServerMode()
  const locale = getUserLocaleFromCookies()
  const url = getEventImageUrl()

  return (
    <div className={frontLayoutClasses.root}>
      <Header mode={mode} locale={locale} logoURL={url} />
      {children}
      <Footer locale={locale} logoURL={url} />
    </div>
  )
}

export default FrontLayout
