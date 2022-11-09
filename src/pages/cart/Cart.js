import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CART_TOTAL_QUANTITY,
  DECREASE_CART,
  DELETE_ALL_ITEM,
  DELETE_ITEM,
  seletctCartItems,
  seletctCartTotalAmount,
  seletctCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";

const Cart = () => {
  
  const cartItems = useSelector(seletctCartItems);
  const cartTotalQuantity = useSelector(seletctCartTotalQuantity);
  const cartTotalAmount = useSelector(seletctCartTotalAmount);
  const dispatch = useDispatch();
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const deleletCartItem = (cart) => {
    dispatch(DELETE_ITEM(cart));
  };
  const clearAllItem = () => {
    dispatch(DELETE_ALL_ITEM())
  }
 
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
  }, [dispatch , cartItems])

  useEffect(() =>{
    dispatch(CART_TOTAL_QUANTITY())
  }, [dispatch , cartItems])

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {
          <div className={`container ${styles.table}`}>
            {cartItems.length === 0 ? (
              <>
                <p>your cart is empty</p>
                <br />
                <Link to="/#products">&larr; Continue shopping</Link>
              </>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/q</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quanity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((cart, index) => {
                      const { id, name, price, imageURL, cartQuanity } = cart;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              <b>{name}</b>
                            </p>
                            <img
                              style={{ width: "100px" }}
                              src={imageURL}
                              alt={name}
                            />
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className={styles.count}>
                              <button
                                className="--btn"
                                onClick={() => decreaseCart(cart)}
                              >
                                -
                              </button>
                              <p>
                                <b>{cartQuanity}</b>
                              </p>
                              <button
                                className="--btn"
                                onClick={() => increaseCart(cart)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>{(price * cartQuanity).toFixed(2)}</td>
                          <td
                            className={styles.icons}
                            onClick={() => deleletCartItem(cart)}
                          >
                            <FaTrashAlt size={18} color="red" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className={styles.summary}>
                  <button onClick={clearAllItem} className="--btn --btn-danger">Clear Cart</button>

                  <div className={styles.checkout}>
                    <div>
                      <Link to="/#products">&larr; Continue Shopping</Link>
                    </div>
                    <br />
                    <Card cardClass={styles.Card}>
                      <p>Cart Item(s): <b>{` ${cartTotalQuantity}`}</b></p>
                      <div className={styles}>
                        <h4>Subtotal : </h4>
                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                      </div>
                      <p>Tax an shipping calculated at checkout</p>
                      <button className="--btn --btn-primary">Checkout</button>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        }
      </div>
    </section>
  );
};

export default Cart;
