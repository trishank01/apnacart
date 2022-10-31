import React from 'react'
import styles from './Footer.module.scss'


const date =  new Date()
const year = date.getFullYear()

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        &copy; {year} Develop with 💖 by <a href="https://trishank.me/" rel="noreferrer" target="_blank">Trishank.me</a>
      </p>
    </div>
  )
}

export default Footer