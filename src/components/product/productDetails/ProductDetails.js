import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import styles from "./ProductDetails.module.scss";
import spinner from "./../../../assets/spinner.jpg";
import {
  ADD_TO_CART,
  CART_TOTAL_QUANTITY,
  DECREASE_CART,
  seletctCartItems,
} from "../../../redux/slice/cartSlice";

const ProductDetails = () => {
  //const product = useSelector(selectProducts)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector(seletctCartItems);

  const cart = cartItems.find((item) => item.id === id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("product not found");
    }
  };

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
      </div>
    </section>
  );
};

export default ProductDetails;
