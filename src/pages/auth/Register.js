import React, { useState } from "react";
import styles from "./Auth.module.scss";
import RegisterImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, SetCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password do not match");
    }
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   console.log(user)
   setIsLoading(false)
   toast.success("Registration successful...")
   navigate("/login")
    // ...
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
    // ..
  });
  };
  return (
    <>
      {isLoading && <Loader/>}
      <section className={` container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => SetCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Alredy have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={RegisterImg} alt="register" width="400px" />
        </div>
      </section>
    </>
  );
};

export default Register;
