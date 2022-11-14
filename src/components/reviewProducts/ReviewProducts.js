import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { selectIsUserID, selectIsUserName } from "../../redux/slice/authSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const userID = useSelector(selectIsUserID);
  const userName = useSelector(selectIsUserName);

  const product = products.find((item) => item.id === id);
  const submitReview = (e) => {
     e.preventDefault()
     console.log(rate , review)
    };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        <p>
          <b>Product name : </b>
          {product.name}
        </p>
        <img style={{width: "100px"}} src={product.imageURL} alt={product.name} />
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea value={review} required onChange={(e) => setReview(e.target.value)} cols="30" rows="10"></textarea>
            <button type="submit" className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
