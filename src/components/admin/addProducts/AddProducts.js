import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import styles from "./AddProducts.module.scss";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";


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
  const [product, setProduct] = useState({
   ...initialState
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate= useNavigate()

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
        console.log("Upload is " + progress + "% done");
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
      <h1>Add Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
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
            {uploadProgress === 100 && (
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
            Save Product
          </button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddProducts;
