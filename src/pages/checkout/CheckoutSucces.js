import React from "react";
import { Link } from "react-router-dom";

const CheckoutSucces = () => {
  return (
    <div>
      <div className="container">
        <h2>Checkout Successfull</h2>
        <p>Thanks for your purchase</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history">View Order Status</Link>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSucces;
