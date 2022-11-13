import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CART_TOTAL_QUANTITY,
  seletctCartItems,
  seletctCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectIsEmail } from "../../redux/slice/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";

import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");

  const [clientSecret, setClientSecret] = useState("");


  const cartItems = useSelector(seletctCartItems);
  const totalAmount = useSelector(seletctCartTotalAmount);
  const customerEmail = useSelector(selectIsEmail);

  const billingAddress = useSelector(selectBillingAddress);
  const ShippingAddress = useSelector(selectShippingAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CART_TOTAL_QUANTITY());
   
  }, [dispatch, cartItems]);

  const description = `ApnaStore payment: email:${customerEmail} , Amount : ${totalAmount}`;



  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: ShippingAddress,
        billing: billingAddress,
        description: description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } 
          return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(() => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">
          {!clientSecret && <h3>{message}</h3>}
        </div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </>
  );
};

export default Checkout;
