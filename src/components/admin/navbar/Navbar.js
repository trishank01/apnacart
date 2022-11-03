import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";

// const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const username = useSelector(selectIsUserName);
  console.log(username);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <br/>
         <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-products" className={activeLink}>
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
             Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
