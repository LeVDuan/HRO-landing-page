// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTranslations } from 'next-intl'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
// import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'
import { getFont } from '@/utils/getFont'

interface FooterProps {
  locale: string
  logoURL: string
}

function Footer({ locale, logoURL }: FooterProps) {
  const t = useTranslations('footer')
  const hustLink = 'https://hust.edu.vn/vi/'
  const VNTTLink = 'https://www.facebook.com/bvnttbkhn'
  const VBSFLink = 'https://vbsfvietnam.com/'
  const GalleryLink = '/gallery'
  const hroFbLink = 'https://www.facebook.com/HUSTRedOwlsBaseballTeam'
  const hroInsLink = 'https://www.instagram.com/hustredowlsbaseballteam/'

  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative'>
        <img
          src='/landing-page/footer-bg.png'
          alt='footer bg'
          className='absolute inset-0 is-full bs-full object-cover -z-[1]'
        />
        <div className={classnames('plb-12 text-white', frontCommonStyles.layoutSpacing)}>
          <Grid container rowSpacing={10} columnSpacing={12}>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col items-start gap-4'>
                <Link href='/'>
                  <div className='flex gap-4 align-middle'>
                    <img src={logoURL} alt='HRO Logo' className='bs-[55px]' />
                    <Typography
                      color='white'
                      fontWeight={700}
                      fontSize={30}
                      className='lg:max-is-[500px] opacity-[0.98] align-middle'
                    >
                      HRO
                    </Typography>
                  </div>
                  <Typography color='white' mt={5} fontWeight={700} className='lg:max-is-[390px] opacity-[0.98]'>
                    HUST Red Owls Baseball team
                  </Typography>
                </Link>
                <div>
                  <Typography color='white' className='lg:max-is-[390px] opacity-[0.78]'>
                    CLB Bóng chày Đoàn Đại học Bách khoa Hà Nội
                  </Typography>
                  <Link href='https://maps.app.goo.gl/zquxuh2bkqrc2ips6' target='_blank'>
                    <Typography
                      color='white'
                      mt={1}
                      className='lg:max-is-[390px] opacity-[0.78] hover:text-primary'
                      sx={{ fontFamily: `${getFont(locale)}` }}
                    >
                      {t('No 1 Dai Co Viet, Hai Ba Trung District, Hanoi, Vietnam')}
                    </Typography>
                  </Link>
                  <Typography color='white' mt={1} className='lg:max-is-[390px] opacity-[0.78]'>
                    hustredowlsbaseballteam@gmail.com
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[1]' fontFamily={getFont(locale)}>
                {t('Links')}
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography
                  component={Link}
                  href={GalleryLink}
                  target='_blank'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('Gallery')}
                </Typography>
                <Typography
                  component={Link}
                  href={hustLink}
                  target='_blank'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  HUST
                </Typography>
                <Typography
                  component={Link}
                  href={VNTTLink}
                  target='_blank'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('VNTT committee')}
                </Typography>
                <Typography
                  component={Link}
                  href={VBSFLink}
                  target='_blank'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('VBSF Vietnam')}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[1]' fontFamily={getFont(locale)}>
                {t('Club Structure')}
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography
                  component={Link}
                  href='#leaders'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('Leaders')}
                </Typography>
                <Typography
                  component={Link}
                  href='#managers'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('Managers')}
                </Typography>
                <Typography
                  component={Link}
                  href='#media'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('Media')}
                </Typography>
                <Typography
                  component={Link}
                  href='#players'
                  color='white'
                  className='opacity-[0.78]'
                  fontFamily={getFont(locale)}
                >
                  {t('Players')}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography color='white' className='font-medium mbe-6 opacity-[1]' fontFamily={getFont(locale)}>
                {t('Social network')}
              </Typography>
              <div className='flex flex-col gap-4'>
                <Link href={hroFbLink} target='_blank' className='bg-[#211B2C] bs-[56px] is-[211px] rounded'>
                  <div className='flex items-center pli-5 plb-[7px] gap-6'>
                    <img src='/logos/f_logo.png' alt='Facebook Logo' className='bs-[34px]' />
                    <div className='flex flex-col items-start'>
                      <Typography
                        variant='body2'
                        color='white'
                        className='capitalize opacity-[0.82]'
                        fontFamily={getFont(locale)}
                      >
                        {t('Follow on')}
                      </Typography>
                      <Typography color='white' className='font-medium capitalize opacity-[0.92]'>
                        Facebook
                      </Typography>
                    </div>
                  </div>
                </Link>
                <Link href={hroInsLink} target='_blank' className='bg-[#211B2C] bs-[56px] is-[211px] rounded'>
                  <div className='flex items-center pli-5 plb-[7px] gap-6'>
                    <img src='/logos/ins_logo.png' alt='Instagram' className='bs-[34px]' />
                    <div className='flex flex-col items-start'>
                      <Typography variant='body2' color='white' className='opacity-[0.82]' fontFamily={getFont(locale)}>
                        {t('Follow on')}
                      </Typography>
                      <Typography color='white' className='font-medium opacity-[0.92]'>
                        Instagram
                      </Typography>
                    </div>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='bg-[#211B2C]'>
        <div
          className={classnames(
            'flex flex-wrap items-center justify-center sm:justify-between gap-4 plb-[15px]',
            frontCommonStyles.layoutSpacing
          )}
        >
          <p className='text-white text-[13px] opacity-[0.92]'>
            <span>{`© ${new Date().getFullYear()}, Made with `}</span>
            <span>{`❤️`}</span>
            <span>{` by `}</span>
            <Link href='https://github.com/LeVDuan' target='_blank' className='font-medium text-white'>
              DuanLV
            </Link>
          </p>
          <div className='flex gap-6 items-center opacity-[0.78]'>
            <IconButton component={Link} size='small' href='https://github.com/LeVDuan' target='_blank'>
              <i className='ri-github-fill text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='https://www.facebook.com/LeVDuan0308/' target='_blank'>
              <i className='ri-facebook-fill text-white text-lg' />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
