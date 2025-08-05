import React from 'react'
import './ProductsPage.css';
import ProductsSidebar from './ProductsSidebar';
import ProductsList from './ProductsList'; // Assuming you have a ProductsList component

const ProductsPage = () => {
  return (
    <section className="products_page">
      <ProductsSidebar />
      <ProductsList />
    </section>

  )
}

export default ProductsPage
