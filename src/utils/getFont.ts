import { Inter, Roboto } from 'next/font/google'

// Returns initials from string
// const notoSerifJP = Noto_Serif_JP({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '900']
// })

// const notoSerifKR = Noto_Serif_KR({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '900']
// })

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900']
})

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] })

export const getFont = (locale: string) => {
  if (locale === 'ja') {
    return roboto.style.fontFamily
  }

  if (locale === 'ko') {
    return roboto.style.fontFamily
  } else {
    return inter.style.fontFamily
  }
}
