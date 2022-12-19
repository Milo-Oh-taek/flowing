import React from "react";
import styles from "./Foot.module.css";

const Foot = () => {
  return (
    <>
      <div>
        © 2022. Hyeontaek{" "}
        <a href="mailto:oht366@gmail.com" className={styles.mail}>
          Oh. Milo
        </a>
      </div>
    </>
  );
};

export default Foot;
