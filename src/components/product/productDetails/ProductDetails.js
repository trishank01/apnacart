import { async } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { selectProducts } from "../../../redux/slice/productSlice";
import styles from "./ProductDetails.module.scss";
import spinner from "./../../../assets/spinner.jpg";

const ProductDetails = () => {
  //const product = useSelector(selectProducts)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);
  console.log(product);

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
  // const singleProduct = product.find((item) => item.id === id)
  //console.log(singleProduct)
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="#/product">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinner} alt="Loading..." />
        ) : (
          <div className={styles.details}>
            <div>
              <img src={product.imageURL} alt={product.name} />
            </div>
             <div className={styles.content}></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
