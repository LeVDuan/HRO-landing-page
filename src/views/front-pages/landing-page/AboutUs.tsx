// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// Type Imports

import { useTranslations } from 'next-intl'

import type { ThemeColor } from '@core/types'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import AboutUsIcon from '@/assets/svg/front-pages/landing-page/AboutUsIcon'
import { founders } from '@/fake-db/data'

const Card = styled(MuiCard)`
  &:hover {
    border-color: ${(props: { color: ThemeColor }) => props.color};

    & i:nth-child(1) {
      color: rgb(59, 89, 152) !important;
    }
    & i:nth-child(2) {
      color: rgb(0, 172, 238) !important;
    }
    & i:nth-child(3) {
      color: rgb(0, 119, 181) !important;
    }
  }
`

const AboutUs = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)
  const t = useTranslations('aboutUs')

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
    <section id='about-us' className='plb-[100px] bg-backgroundPaper' ref={ref}>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex is-full justify-center relative'>
            <ElementOne className='absolute inline-end-0' />
            <div className='flex items-center justify-center mbe-6 gap-3'>
              {/* <Lines /> */}
              <AboutUsIcon />
              <Typography color='text.primary' className='font-medium uppercase'>
                {t('About us')}
              </Typography>
            </div>
          </div>
          <div className='flex items-center justify-center flex-wrap gap-2 mbe-3 sm:mbe-1'>
            <Typography variant='h4' className='font-bold'>
              {t('The beginning')}
            </Typography>
            <Typography variant='h5'>{t('of HRO')}</Typography>
          </div>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text1')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text2')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text3')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text4')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text5')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text6')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text7')}
          </Typography>
          <Typography color='text.secondary' className='font-medium text-center'>
            {t('text8')}
          </Typography>
        </div>
        <Grid
          container
          rowSpacing={16}
          columnSpacing={6}
          className='mbe-8 pbs-[100px] flex justify-center items-center gap-10'
        >
          {founders.map((member, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card className='shadow-none border overflow-visible' color={member.color as ThemeColor}>
                <CardContent className='flex flex-col items-center justify-center p-0'>
                  <div
                    className='flex justify-center is-full mli-auto text-center bs-[250px] relative overflow-visible rounded-ss-md rounded-se-md'
                    style={{ backgroundColor: member.color }}
                  >
                    <img src={member.image} alt={member.name} className='bs-[300px] absolute block-start-[-50px]' />
                  </div>
                  <div className='flex flex-col gap-3 p-5 is-full'>
                    <div className='text-center'>
                      <Typography variant='h5'>{member.name}</Typography>
                      <Typography color='text.secondary'>{t(member.position)}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default AboutUs
