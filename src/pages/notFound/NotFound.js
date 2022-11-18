import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div className={styles}>
        <h2>404</h2>
        <h4>Oppppssss, Page not found</h4>
        <img style={{width: "300px"}} src="https://media.tenor.com/vYTwUEafhogAAAAC/404.gif" alt="notFound"/>
        <button className="--btn">
          <Link to="/">&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
