import { useContext } from "react";
import { AppContext } from "components/AppProvider";

import Link from "next/link";

import { useState, useEffect } from "react";

import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";

import styles from "styles/components/NavBar.module.scss";

const Ham = () => {
  const app = useContext(AppContext);

  const [hamOpen, setHamOpen] = useState(false);

  function closeHamNav() {
    setHamOpen(false);
  }

  useEffect(() => {
    if (hamOpen) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [hamOpen]);

  return (
    <div className={styles.ham}>
      <div
        onClick={() => {
          setHamOpen(!hamOpen);
        }}
        className={styles.openButton}
      >
        <Burger isOpen={hamOpen} />
      </div>

      <div
        className={`${hamOpen ? styles.hamShow : styles.hamHide} ${
          styles.hamContent
        }`}
      >
        <section className={styles.links}>
          <Link href="/">
            <a onClick={closeHamNav}>Home</a>
          </Link>

          <Link href="/blog">
            <a
              onClick={() => {
                app.setSearchBox("");
                closeHamNav();
              }}
            >
              Blog
            </a>
          </Link>

          <a
            onClick={closeHamNav}
            href="https://github.com/CubingSoda/site"
            target="_blank"
            rel="noreferrer"
            className={styles.repoLink}
          >
            <img src="/img/icons/github.png" alt="Github Icon" />
            <span>Source Code</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Ham;
