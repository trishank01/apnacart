import React from "react";
import { Link } from "react-router-dom";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
const ProductItem = ({ id, product, grid, name, price, desc, imageURL }) => {
  const shortenText = (text, num) => {
    if (text.length > num) {
      const sortenedtext = text.substring(0, num).concat("...");
      return sortenedtext;
    }
    return text;
  };
  return (
    <Card cardClass={grid ? `${styles.grid} ` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 15)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className="--btn --btn-danger">Add To Cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
