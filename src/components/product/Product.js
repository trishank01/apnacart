import React, { useEffect } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHook/useFetchCollection";
import spinner from '../../assets/spinner.jpg'


const Product = () => {
  const {data , isLoading } = useFetchCollection("products")

const dispatch = useDispatch();
  const products =  useSelector(selectProducts)



  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch , data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {isLoading ? null :<ProductFilter products={products}/>}
        </aside>
        <div className={styles.content}>
          {isLoading ? <img src={spinner} style={{width:"50px"}} className="--center-all" alt="Loading..."/> 
          : <ProductList products={products}/>}    
        </div>
      </div>
    </section>
  );
};

export default Product;
