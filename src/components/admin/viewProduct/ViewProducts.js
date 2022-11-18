import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ViewProducts.module.scss";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHook/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";


const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const products =  useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)

   //Pagination states
   const [currentPage , setCurrentPage] = useState(1)
   const [productsPerPage , setProductsPerPage] = useState(10)
 
   //Get Current Products
   const indexOfLastProduct = currentPage * productsPerPage
 
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  
   const currentProducts = filteredProducts.slice(indexOfFirstProduct , indexOfLastProduct)
 

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch , data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ search, products }));
  }, [search, products, dispatch]);


  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Proudct!!!",
      "Your are about to delete to this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        toast.success("Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",

        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storegeRef = ref(storage, imageURL);
      await deleteObject(storegeRef);
      toast.success("Product deleted successfully..");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
      <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> product found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>Product not found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>₹{price}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
           <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length}/>
      </div>
      
    </>
  );
};

export default ViewProducts;
