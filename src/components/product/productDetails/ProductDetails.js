import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import spinner from "./../../../assets/spinner.jpg";
import {
  ADD_TO_CART,
  CART_TOTAL_QUANTITY,
  DECREASE_CART,
  seletctCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHook/useFetchDocument";
import useFetchCollection from "../../../customHook/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  //const product = useSelector(selectProducts)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { document } = useFetchDocument("products", id);

  const cartItems = useSelector(seletctCartItems);

  const cart = cartItems.find((item) => item.id === id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => {
    return review.productID === id;
  });

  console.log(filteredReviews);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  //old one now converted to cumstom hook

  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //   } else {
  //     toast.error("product not found");
  //   }
  // };

  const addTOcart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CART_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CART_TOTAL_QUANTITY());
  };
  // const singleProduct = product.find((item) => item.id === id)
  //console.log(singleProduct)
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#product">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinner} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>₹{product.price}</p>
              <p>₹{product.desc}</p>
              <p>
                <b>SKU</b> {product.id}
              </p>
              <p>
                <b>Brand</b> {product.brand}
              </p>
              <div className={styles.count}>
                {isCartAdded < 0 ? null : (
                  <>
                    <button
                      onClick={() => decreaseCart(product)}
                      className="--btn"
                    >
                      -
                    </button>
                    <p className="--btn">{cart.cartQuanity}</p>
                    <button
                      onClick={() => addTOcart(product)}
                      className="--btn"
                    >
                      +
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => addTOcart(product)}
                className="--btn --btn-danger"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Review</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((userReview, index) => {
                  const { id , rate, review, reviewDate, userName } = userReview;
                  return (
                    <div key={rate + index + id } className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate} </b>
                      </span>
                      <span>
                        <b>by {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
