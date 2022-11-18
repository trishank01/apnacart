import React, { useEffect } from 'react'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'


const Home = () => {
  const url = window.location.href
  //const 


  useEffect(() => {
    const scrollToProducts = () => {
      if(url.includes("#product")){
        window.scrollTo({
          top : 680,
          behavior : "smooth"
        })
        return
      }
    }
    scrollToProducts()
  },[url])
  return (
    <div>
        <Slider/>
        <Product/>
    </div>

  )
}

export default Home