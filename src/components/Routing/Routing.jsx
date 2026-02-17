import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../Home/HomePage';
import ProductsPage from '../Products/ProductsPage';
import SingleProductPage from '../SingleProduct/SingleProductPage';
import CartPage from '../Cart/CartPage';
import MyOrderPage from '../MyOrder/MyOrderPage';
import LoginPage from '../Authentication/LoginPage';
import SignupPage from '../Authentication/SignupPage';
import Logout from '../Authentication/Logout';
import ProtectedRoute from './ProtectedRoute';
import ScrollablePage from '../Scrollable/ScrollablePage';
import IFrameParentPage from '../iFrame/IFrameParentPage';
import HashTestPage from '../HashTest/HashTestPage';
import HashSectionsPage from '../HashTest/HashSectionsPage';
import HashTabsPage from '../HashTest/HashTabsPage';
import HashParamsPage from '../HashTest/HashParamsPage';

const Routing = () => {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/scrollable" element={<ScrollablePage />} />
      <Route path="/iframe" element={<IFrameParentPage />} />
      <Route path="/hashtest" element={<HashTestPage />} />
      <Route path="/hashtest/sections" element={<HashSectionsPage />} />
      <Route path="/hashtest/tabs" element={<HashTabsPage />} />
      <Route path="/hashtest/params" element={<HashParamsPage />} />
       <Route element={<ProtectedRoute />}>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/myorders" element={<MyOrderPage />} />      
      <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  )
}

export default Routing
