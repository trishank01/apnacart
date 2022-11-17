import {  doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from './ChangeOrderStatus.module.scss'

const ChangeOrderStatus = ({order , id }) => {
  const [status, setStatus] = useState("");
  console.log(status)
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate()

  const editOrder = (e , id) => {
    e.preventDefault()
    setIsloading(true)

    const orderConfig = {
      userID : order.userID,
      userEmail : order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems : order.cartItems,
      shippingAddress : order.shippingAddress,
      createdAt: order.createdAt,
      editedAt : Timestamp.now().toDate()
    };
    try {
      setDoc(doc(db, "orders" , id), orderConfig);
      setIsloading(false)
      toast.success("Order status change successfully");
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.message);
      setIsloading(false)
    }
  };


  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e , id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  --Select one--
                </option>
                <option value="OrderPlace...">OrderPlace...</option>
                <option value="Processing...">Processing...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
