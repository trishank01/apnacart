import React from 'react'
import  ReactDOM  from 'react-dom'
import styles from './Loader.module.scss'
import LoaderImg from '../../assets/loader.gif'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={`${styles.wrapper} --center-all`} >
        <div className={styles.Loader}>
        <img src={LoaderImg} alt="Loading..."/>
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader