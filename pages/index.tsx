import { useState } from "react";
import Link from "next/link";

import UI from "components/UI";
import MediaLinks from "components/Home/MediaLinks";

import styles from "styles/Home.module.scss";

const Home = () => {
  function open() {
    setToggle(!toggle);
    const popup = document.querySelector(".popup-text");
    popup.classList.toggle("show");
  }

  const [toggle, setToggle] = useState(false);

  return (
    <UI page="Home">
      <main className={styles.main}>
        <img
          src="/img/icons/site.png"
          className={styles.heroIcon}
          alt="Site Icon"
          draggable="false"
        />

        <div className={styles.card}>
          <div>
            <div className={styles.gradient}>
              Hi, I am CubingSoda<span>.</span>
            </div>

            <div className={styles.text}>
              <section>
                I am a programmer-student living in the United States. I have
                intermediate Python skills, with experience in libraries such as
                Selenium and Tkinter. I also mastered front-end web development
                with technologies like React, Next, NPM, and SCSS. I am also
                familiar with version control software such as Git/GitHub.
              </section>

              <section>
                My current machine is the M2 MacBook Air, 8GB/512GB. I wrote an
                article{" "}
                <Link href="/blog/new-setup">
                  <a>here</a>
                </Link>{" "}
                about my computer setup.
              </section>
            </div>
          </div>

          <MediaLinks toggle={toggle} open={open} />
        </div>
      </main>
    </UI>
  );
};

export default Home;
