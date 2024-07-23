// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports

// SVG Imports
// import Lines from '@assets/svg/front-pages/landing-page/Lines'

import RunnerIcon from '@assets/svg/front-pages/landing-page/RunnerIcon'
import LeagueIcon from '@assets/svg/front-pages/landing-page/LeagueIcon'
import PitcherActIcon from '@/assets/svg/front-pages/landing-page/PitcherActIcon'
import BatterActIcon from '@/assets/svg/front-pages/landing-page/BatterActIcon'
import HomeplateIcon from '@/assets/svg/front-pages/landing-page/HomeplateIcon'

import { useIntersection } from '@/hooks/useIntersection'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'
import ActivityIcon from '@/assets/svg/front-pages/landing-page/ActivityIcon'
import BallIcon from '@/assets/svg/front-pages/landing-page/BallIcon'

// Data
const activity = [
  {
    icon: <BallIcon />,
    title: 'Luyện tập hàng tuần',
    description: 'Cùng nhau luyện tập kĩ năng, chiến thuật, tận hưởng bóng chày'
  },
  {
    icon: <HomeplateIcon />,
    title: 'Thi đấu nội bộ',
    description: 'Luyện tập khả năng thực chiến, bài kiểm tra trình độ thi đấu thông qua trận đấu nội chiến nảy lửa'
  },
  {
    icon: <LeagueIcon />,
    title: 'Tham gia giải đấu',
    description: 'Tham gia các giải đấu bóng chày được tổ chức tại Hà Nội, toàn quốc'
  },
  {
    icon: <RunnerIcon />,
    title: 'Thi đấu giao hữu',
    description: 'Tham gia các trận đấu đầy thú vị, giao lưu cùng các CLB khác ở Hà Nội'
  },
  {
    icon: <PitcherActIcon />,
    title: 'Tuyển thành viên',
    description: 'Tìm kiếm những đồng đội mới cho thế hệ tiếp theo mỗi năm một lần'
  },
  {
    icon: <BatterActIcon />,
    title: 'Trải nghiệm bóng chày',
    description: 'Giao lưu cùng HRO tại các sự kiện được tổ chức tại Đại học Bách Khoa Hà Nội'
  }
]

const Activities = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

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
    <section id='activities' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 plb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <ActivityIcon />
            <Typography color='text.primary' className='font-medium uppercase'>
              Hoạt động
            </Typography>
          </div>
          <div className='flex items-center justify-center flex-wrap gap-2 mbe-2 sm:mbe-1'>
            <Typography variant='h4' className='font-bold'>
              Tận hưởng bóng chày
            </Typography>
            <Typography variant='h5'>cùng các hoạt động của HRO</Typography>
          </div>
        </div>
        <div>
          <Grid container columnSpacing={6} rowSpacing={12}>
            {activity.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <div className={classnames('mbe-2', styles.featureIcon)}>
                    <div className='flex items-center border-2 rounded-full p-5 is-[82px] bs-[82px]'>{item.icon}</div>
                  </div>
                  <Typography variant='h5'>{item.title}</Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default Activities