// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useTranslations } from 'next-intl'

import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementTwo from '@assets/svg/front-pages/landing-page/ElementTwo'
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import { getFont } from '@/utils/getFont'

const ContactUs = ({ locale }: { locale: string }) => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)
  const t = useTranslations('contact')

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
    <section id='contact-us' className='bg-backgroundPaper' ref={ref}>
      <div className={classnames('flex flex-col gap-14 plb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className={classnames('flex flex-col items-center justify-center')}>
          <div className='flex is-full justify-center items-center relative'>
            <ElementTwo className='absolute inline-start-0' />
            <div className='flex items-center justify-center mbe-6 gap-3'>
              <Lines />
              <Typography color='text.primary' className='font-medium' sx={{ fontFamily: `${getFont(locale)}` }}>
                {t('Contact us')}
              </Typography>
            </div>
          </div>
          <div className='flex items-center flex-wrap justify-center gap-x-2 mbe-1'>
            {locale === 'ja' ? (
              <>
                <Typography variant='h5' sx={{ fontFamily: `${getFont(locale)}` }}>
                  {t('Let’s play baseball')}{' '}
                </Typography>
                <Typography variant='h4' className='font-bold' sx={{ fontFamily: `${getFont(locale)}` }}>
                  <span className='relative z-[1] font-extrabold'>
                    {t('together!')}
                    <img
                      src='/landing-page/bg-shape.png'
                      alt='bg-shape'
                      className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                    />
                  </span>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='h4' className='font-bold' sx={{ fontFamily: `${getFont(locale)}` }}>
                  <span className='relative z-[1] font-extrabold'>
                    {t('Let’s play baseball')}
                    <img
                      src='/landing-page/bg-shape.png'
                      alt='bg-shape'
                      className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                    />
                  </span>{' '}
                </Typography>
                <Typography variant='h5' sx={{ fontFamily: `${getFont(locale)}` }}>
                  {t('together!')}
                </Typography>
              </>
            )}
          </div>
          <Typography
            color='text.secondary'
            className='font-medium text-center'
            sx={{ fontFamily: `${getFont(locale)}` }}
          >
            {t('description')}
          </Typography>
        </div>
        <div>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={5}>
              <Card className='bg-primary'>
                <CardContent className='flex flex-col gap-4 pli-8 pbs-8 pbe-7'>
                  <div className='flex flex-col gap-[6px]'>
                    <Typography className='font-medium text-white' sx={{ fontFamily: `${getFont(locale)}` }}>
                      {t('Let’s contact with us')}
                    </Typography>
                    <Typography variant='h4' className='text-white' sx={{ fontFamily: `${getFont(locale)}` }}>
                      {t('Please share your ideas or requests with us')}
                    </Typography>
                  </div>
                  <img src='/landing-page/chat.png' alt='Hoo Lau chat' className='is-full' />
                  <Typography className='text-white' sx={{ fontFamily: `${getFont(locale)}` }}>
                    {t('description2')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <Card>
                <CardContent>
                  <Typography variant='h5' className='mbe-5' sx={{ fontFamily: `${getFont(locale)}` }}>
                    {t('Share your ideas')}
                  </Typography>
                  <form className='flex flex-col items-start gap-5'>
                    <div className='flex gap-5 is-full'>
                      <TextField
                        fullWidth
                        label={t('Full name')}
                        id='name-input'
                        sx={{ fontFamily: `${getFont(locale)}` }}
                      />
                      <TextField
                        sx={{ fontFamily: `${getFont(locale)}` }}
                        fullWidth
                        label={t('Email address')}
                        id='email-input'
                        type='email'
                      />
                    </div>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label={t('Message')}
                      id='message-input'
                      sx={{ fontFamily: `${getFont(locale)}` }}
                    />
                    <Button variant='contained' sx={{ fontFamily: `${getFont(locale)}` }}>
                      {t('Send Inquiry')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
