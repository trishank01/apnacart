import React from "react";
import styles from "./CheckoutSummary.module.scss";
import { useSelector } from "react-redux";
import {
  seletctCartItems,
  seletctCartTotalAmount,
  seletctCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector(seletctCartItems);
  const cartotalAmount = useSelector(seletctCartTotalAmount);
  const cartTotalQantity = useSelector(seletctCartTotalQuantity);
  return (
    <div>
      <h3>CheckoutSummary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <button className="--btn">
              <Link to="#products">Back to Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart items(s) : ${cartTotalQantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Total</h4>
              <h3>{cartotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((cart, index) => {
              const { id, name, price, cartQuanity } = cart;
              return (
                <Card cardClass={styles.card} key={id}>
                  <h4>Product : {name}</h4>
                  <p>Quantiy : {cartQuanity}</p>
                  <p>Unit Price : {price}</p>
                  <p>Sub Price : {price * cartQuanity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
