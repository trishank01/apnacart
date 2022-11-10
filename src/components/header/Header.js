import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnyLink } from "../adminOnyRoute/AdminOnyRoute";
import { CART_TOTAL_QUANTITY, seletctCartItems, seletctCartTotalQuantity } from "../../redux/slice/cartSlice";




const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Apna<span>Store</span>.
      </h2>
    </Link>
  </div>
);



const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false)
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(seletctCartTotalQuantity);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  // const FixNavbar = () => {
  //   if(window.scrollY > 5){
  //     setScrollPage(true)
  //   }else {
  //     setScrollPage(false)
  //   }
     
  // }

  // window.addEventListener("scroll" , FixNavbar)

  useEffect(() => {
    dispatch(CART_TOTAL_QUANTITY())
  },[])


  //Monitor currently sign in user
  const Navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
        // ...
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
        // User is signed out
        // ...
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logout successfully...");
        Navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };
//className={`${styles.fixed}`}
  return (
    <header className={`${styles.fixed}`}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            onClick={hideMenu}
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${"nav-wrapper"}`
            }
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes
                size={22}
                color="#fff"
                cursor="pointer"
                onClick={hideMenu}
              />
            </li>
            <li>
              <AdminOnyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnyLink>
            </li>
            <li>
              <NavLink to="/" end className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi , {displayName}
                </a>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
