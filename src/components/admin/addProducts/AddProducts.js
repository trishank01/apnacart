import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import styles from "./AddProducts.module.scss";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";




const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}

const AddProducts = () => {
  const {id} = useParams()
  const products = useSelector(selectProducts)
  const productEdit = products.find((item) => item.id === id)
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id ,
      {...initialState}, 
      productEdit
      )
      return newState
  });

 


  const [uploadProgress, setUploadProgress] = useState(0);
  console.log(uploadProgress)
  const [isLoading, setIsLoading] = useState(false);
  const Navigate= useNavigate()

  function detectForm(id , f1 ,f2) {
      if(id === "ADD"){
        return f1
      }
      else{
        return f2
      }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const addProduct =  (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      // Add a new document with a generated id.
       addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt : Timestamp.now().toDate()
      });
      setIsLoading(false)
      setProduct({...initialState})
      setUploadProgress(0)
      toast.success("Product uploaded successfully")
      Navigate('/admin/all-products')
    } catch (error) {
      setIsLoading(false)
       
      toast.error(error.message)
      
    }
  };
  
  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(product.imageURL !== productEdit.imageURL){
      const storegeRef = ref(storage, productEdit.imageURL);
       deleteObject(storegeRef);
    }
    try {
       setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt : productEdit.createdAt,
        editedAt : Timestamp.now().toDate()    
      });
      setIsLoading(false)
      toast.success("Product Edited Successfully..")
      Navigate('/admin/all-products')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `apnaStore/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("image uploaded successfully");
        });
      }
    );
  };
  
  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.product}>
      {id === "ADD" ? <h2>Add new Product</h2> : <h2>Edit Product</h2>}
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id , addProduct , editProduct)}>
          <label>Product name :</label>
          <input
            type="text"
            placeholder="Product name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Image :</label>
          <Card cardClass={styles.groupd}>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}`
                    : `upload completed ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              placeholder="Product Image"
              //required
              accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL !== "" && (
              <input
                type="text"
                required
                name="imageURL"
                disabled
                value={product.imageURL}
              />
            )}
          </Card>

          <label>Product Price :</label>
          <input
            type="number"
            placeholder="Product Price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Category :</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- Choose Product Category
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product Brand"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Description:</label>
          <textarea
            name="desc"
            cols="30"
            rows="10"
            required
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <button type="submit" className="--btn --btn-primary">
           {detectForm(id , "Add Product" , "Edit Product")}
          </button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddProducts;
