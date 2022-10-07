import UI from "components/UI";
import MediaLink from "components/Home/MediaLink";

import { useState } from "react";
import Link from "next/link";

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

          <div className={styles.link}>
            <section className={styles.mobile} onClick={open}>
              {toggle ? (
                <i className="fa-solid fa-arrow-down fa-2xl"></i>
              ) : (
                <i className="fa-solid fa-arrow-up fa-2xl"></i>
              )}
              <span>{toggle ? <>Hide</> : <>Show</>} Social Profiles</span>

              <div className="popup-text">
                <MediaLink
                  name="GitHub"
                  img="/img/icons/github.png"
                  href="https://github.com/CubingSoda"
                />
                <MediaLink
                  name="Reddit"
                  img="/img/icons/reddit.png"
                  href="https://www.reddit.com/user/CubingSoda/"
                />
                <MediaLink
                  name="Discord"
                  img="/img/icons/discord.png"
                  href="https://discord.com/users/822191907286417450"
                />
                <MediaLink
                  name="Stackoverflow"
                  img="/img/icons/stackoverflow.png"
                  href="https://stackoverflow.com/users/17556679/cubingsoda"
                />
                <MediaLink
                  name="10FastFingers"
                  img="/img/icons/10fastfingers.png"
                  href="https://10fastfingers.com/user/3212833/"
                />
                <MediaLink
                  name="Replit"
                  img="/img/icons/replit.png"
                  href="https://replit.com/@cubingsoda"
                />
              </div>
            </section>

            <section className={styles.desktop}>
              <MediaLink
                name="GitHub"
                img="/img/icons/github.png"
                href="https://github.com/CubingSoda"
              />
              <MediaLink
                name="Reddit"
                img="/img/icons/reddit.png"
                href="https://www.reddit.com/user/CubingSoda/"
              />
              <MediaLink
                name="Discord"
                img="/img/icons/discord.png"
                href="https://discord.com/users/822191907286417450"
              />
              <MediaLink
                name="Stackoverflow"
                img="/img/icons/stackoverflow.png"
                href="https://stackoverflow.com/users/17556679/cubingsoda"
              />
              <MediaLink
                name="10FastFingers"
                img="/img/icons/10fastfingers.png"
                href="https://10fastfingers.com/user/3212833/"
              />
              <MediaLink
                name="Replit"
                img="/img/icons/replit.png"
                href="https://replit.com/@cubingsoda"
              />
            </section>
          </div>
        </div>
      </main>
    </UI>
  );
};

export default Home;
