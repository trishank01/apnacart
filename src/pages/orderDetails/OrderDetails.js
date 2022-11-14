import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spinner from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
import useFetchDocument from "../../customHook/useFetchDocument";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
      <h2>OrderDetails</h2>
      <div>
        <Link to="/order-history">&larr; Back to Order Page</Link>
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
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
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
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">Review Product</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          </>
        )}
      </div>
      </div>
    </section>
  );
};

export default OrderDetails;
