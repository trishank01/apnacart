import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/productSlice'

const ProductFilter = () => {
  const products =  useSelector(selectProducts)
  console.log("filter" , products)
  return (
    <div>productFilter</div>
  )
}

export default ProductFilter