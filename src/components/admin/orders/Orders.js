import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../../customHook/useFetchCollection';
import { selectIsUserID } from '../../../redux/slice/authSlice';
import { selectOrderHistory, STORE_ORDERS } from '../../../redux/slice/orderSlice';
import Loader from '../../loader/Loader';
import styles from './Orders.module.scss'
const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch()
  const orders = useSelector(selectOrderHistory)
  const userID = useSelector(selectIsUserID)
   const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  },[dispatch, data])

  // const FilterOrder = orders.filter((order)=> {

  //   return order.userID === userID
  // })


  const handleClick  = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  return (
    <>
      <div className={styles.order}>
      <h2> All Order History</h2>
      <p>Open an order to
        <b> Change Order Status</b>
        <br/>
        <>
        {isLoading && <Loader/>}
         <div className={styles.table}>
          {orders.length === 0 ? (<p>No order found</p> ): (
           <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order , index) => {
              const {id ,  orderDate , orderTime , orderAmount , orderStatus } = order
                return (
               <tr key={id} onClick={() => handleClick(id)}>
                <td>{index + 1}</td>
                <td>{orderDate} at {orderTime}</td>
                <td>{id}</td>
                <td>{`₹${orderAmount}`}</td>
                <td>
                  <p className={orderStatus !== "Delivered" ? `${styles.pending}` : `${styles.delivered}`}>
                     {orderStatus}
                  </p>
                </td>
               </tr>

                )
              })}
            </tbody>
           </table>
          ) }

         </div>
        </>
      </p>
      </div>
    </>
  );
}

export default Orders