import React, { useState } from "react";
import styles from "./Auth.module.scss";
import ResetImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { Loader } from "../../components";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlerResetpassword = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    toast.success("check your email for a reset link")
    setIsLoading(false)
    // ..
  })
  .catch((error) => {
    toast.error(error.message);
    setIsLoading(false)
    // ..
  });
  }
  return (
   <>
   {isLoading && <Loader/>}
    <section className={` container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={ResetImg} alt="Reset Password" width="400px" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form onSubmit={handlerResetpassword}> 
            <input type="text" placeholder="Email" required    value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
            <p>
              <Link to="/login">- Login</Link>
            </p>
            <p>
              <Link to="/register">- Register</Link>
            </p>
          </div>
          </form>
   
        </div>
      </Card>
    </section>
   </>
  );
};

export default Reset;
