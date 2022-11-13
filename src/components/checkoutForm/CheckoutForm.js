import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.scss";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import SpinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEmail, selectIsUserID } from "../../redux/slice/authSlice";
import {  DELETE_ALL_ITEM, seletctCartItems, seletctCartTotalAmount } from "../../redux/slice/cartSlice";
import {  selectShippingAddress } from "../../redux/slice/checkoutSlice";





const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const userID = useSelector(selectIsUserID)
  const userEmail = useSelector(selectIsEmail)
  const cartItems = useSelector(seletctCartItems)
  const shippingAddress = useSelector(selectShippingAddress)
  const cartTotalAmount = useSelector(seletctCartTotalAmount)

  const navigate = useNavigate()

  

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);
 
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(DELETE_ALL_ITEM());
      console.log("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);


    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect : "if_required"
    })
    .then((result) => {
       //ok - paymentIntent or bad - error
       if(result.error){
         toast.error(result.error.message)
         setMessage(result.error.message)
         return
       }
       if(result.paymentIntent){
        if(result.paymentIntent.status === "succeeded"){
              setIsLoading(false)
              toast.success("Payment successful")
              saveOrder()           
        }
       }
    })
    setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]} />
              <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
                <span id="button-text">
                  {isLoading ? (
                    <img src={SpinnerImg} alt="Loading..." styles={{
                      width : "20px"
                    }}/>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>
                {message}
                </div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
