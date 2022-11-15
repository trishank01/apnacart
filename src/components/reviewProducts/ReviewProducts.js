import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHook/useFetchDocument";
import { db } from "../../firebase/config";
import { selectIsUserID, selectIsUserName } from "../../redux/slice/authSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import spinner from "../../assets/spinner.jpg";



const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);

  const products = useSelector(selectProducts);
  const userID = useSelector(selectIsUserID);
  const userName = useSelector(selectIsUserName);
  //const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  console.log(document);

  //const product = products.find((item) => item.id === id);
  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review Submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        {product === null ? (
          <img src={spinner} alt="Loading" style={{width: "50px"}} />
        ) : (
          <>
            <p>
              <b>Product name : </b>
              {product.name}
            </p>
            <img
              style={{ width: "100px" }}
              src={product.imageURL}
              alt={product.name}
            />
          </>
        )}

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
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
