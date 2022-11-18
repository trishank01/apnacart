import React, { useState } from "react";
import styles from "./Auth.module.scss";
import LoginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { GoogleAuthProvider } from "firebase/auth";
import { SAVE_URL, seletctPReviousURL } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();
  const previousURL = useSelector(seletctPReviousURL)

  const redirectUser = () => {
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }else{
      navigate("/")
    }
  }

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password )
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        //console.log("userFromLogin", user);
        toast.success("login successful...");
        setIsLoading(false);
        redirectUser()

        // ...
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  //login with google
  const provider = new GoogleAuthProvider();
  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //const user = result.user;
        toast.success("login successfully");
        redirectUser()
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={LoginImg} alt="Login" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInGoogle}
            >
              <FaGoogle /> Login with Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
