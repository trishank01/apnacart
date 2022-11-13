import React, { useEffect } from "react";
import styles from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { selectIsUserID } from "../../redux/slice/authSlice";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";


const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch()
  const orders = useSelector(selectOrderHistory)
  const userID = useSelector(selectIsUserID)
   const navigate = useNavigate()
  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  },[dispatch, data])

  const FilterOrder = orders.filter((order)=> {

    return order.userID === userID
  })
  console.log('FilterOrder' , FilterOrder)

  const handleClick  = (id) => {
    navigate(`/order-details/${id}`)
  }

  return (
    <section>
      <div className={`container ${styles.order}`}>
      <h2> Your Order History</h2>
      <p>Open an order to leave a
        <b> Product Review</b>
        <br/>
        <>
        {isLoading && <Loader/>}
         <div className={styles.table}>
          {FilterOrder.length === 0 ? (<p>No order found</p> ): (
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
              {FilterOrder.map((order , index) => {
              const {id ,  orderDate , orderTime , orderAmount , orderStatus } = order
                return (
               <tr key={id} onClick={() => handleClick(id)}>
                <td>{index + 1}</td>
                <td>{orderDate} at {orderTime}</td>
                <td>{id}</td>
                <td>{`₹${orderAmount}`}</td>
                <td>
                  <p className={orderStatus !== "Deliverd" ? `${styles.pending}` : `${styles.delivered}`}>
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
    
    </section>
  );
};

export default OrderHistory;
