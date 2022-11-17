import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import ChangeOrderStatus from '../../components/admin/changeOrderStatus/ChangeOrderStatus'
import Home from '../../components/admin/home/Home'
import Navbar from '../../components/admin/navbar/Navbar'
import OrderDetails from '../../components/admin/orderDetails/OrderDetails'
import Orders from '../../components/admin/orders/Orders'
import ViewProducts from '../../components/admin/viewProduct/ViewProducts'
import styles from './Admin.module.scss'

const Admin = () => {
  return (
    <div className={styles.admin}>
       <div className={styles.navbar}>
        <Navbar/>
       </div>
       <div className={styles.content}>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/all-products' element={<ViewProducts/>}></Route>
          <Route path='/add-products/:id' element={<AddProducts/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path="/order-details/:id" element={<OrderDetails/>} />
          <Route path="/change-order-status/:id" element={<ChangeOrderStatus/>} />

        </Routes>
       </div>
    </div>
  )
}

export default Admin