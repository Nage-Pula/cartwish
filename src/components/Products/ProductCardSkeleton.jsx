import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCardSkeleton = () => {
  return (
    <Skeleton className='product_card' width='275px' height='350px' />
  )
}

export default ProductCardSkeleton
