import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../../customHook/useFetchDocument';
import styles from './OrderDetails.module.scss'
import spinner from '../../../assets/spinner.jpg'
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus';
const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const { document } = useFetchDocument("orders", id);
  
    useEffect(() => {
      setOrder(document);
    }, [document]);
    console.log(order);
  
    return (
      <>
        <div className={styles.table}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back to Order Page</Link>
          {order === null ? (
            <img style={{ width: "50px" }} src={spinner} alt="Loading..." />
          ) : (
            <>
              <p>
                <b>Order ID </b>
                {order.id}
              </p>
  
              <p>
                <b>Order Amount </b>
                ₹{order.orderAmount}
              </p>
  
              <p>
                <b>Order Status </b>
                {order.orderStatus}
              </p>

              <p>
                <b>Shipping Address: </b>
                <br/>
               Address : {order.shippingAddress.line1} , {order.shippingAddress.line2}  {order.shippingAddress.city}
               <br/>
               State : {order.shippingAddress.state}
               <br/>
               Country : {order.shippingAddress.country}
              </p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>S/n</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((cart, index) => {
                    const { id, name, price, imageURL, cartQuanity } = cart;
                    return (
                      <tr key={id}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
                        <td>
                          <p>
                            <b>{name}</b>
                          </p>
                          <img
                              src={imageURL}
                              alt={name}
                              style={{ width: "100px" }}
                            />
                        </td>
                        <td>₹{price}</td>
                        <td>{cartQuanity}</td>
                        <td>₹{(price * cartQuanity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </tbody>
              </table>
            </>
          )}
           <ChangeOrderStatus order={order} id={id}/>
        </div>
        </div>
      </>
    );
}

export default OrderDetails