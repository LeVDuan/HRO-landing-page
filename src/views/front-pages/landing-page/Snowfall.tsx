// src/components/Snowfall.tsx
'use client'

import { useEffect } from 'react'

import styles from './styles.module.css'

export default function Snowfall() {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div')

      snowflake.classList.add(styles.snowflake)
      const size = Math.random() * 5 + 5 // 5px - 10px

      snowflake.style.width = `${size}px`
      snowflake.style.height = `${size}px`
      snowflake.style.left = `${Math.random() * 100}vw`
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s` // Thời gian rơi ngẫu nhiên từ 2-5s
      snowflake.style.opacity = String(Math.random() * 0.8 + 0.2) // Độ mờ ngẫu nhiên
      // snowflake.style.fontSize = `${Math.random() * 10 + 10}px` // Kích thước ngẫu nhiên từ 10-20px

      document.querySelector(`.${styles.snowContainer}`)?.appendChild(snowflake)

      // Xóa bông tuyết sau khi animation kết thúc
      snowflake.addEventListener('animationiteration', () => {
        snowflake.remove()
      })
    }

    // Tạo bông tuyết liên tục
    for (let i = 0; i < 100; i++) {
      createSnowflake()
    }

    const interval = setInterval(createSnowflake, 100) // Tạo bông tuyết mới mỗi 200ms

    return () => {
      clearInterval(interval) // Dừng tạo bông tuyết khi component unmount
    }
  }, [])

  return <div className={styles.snowContainer}></div>
}
