import styles from "styles/components/NavBar.module.scss";

import Link from "next/link";

const RegularNav = () => {
  return (
    <div className={styles.regular}>
      <section className={styles.links}>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/blog">
          <a
            onClick={() => {
              process.env.CHANGE("");
            }}
          >
            Blog
          </a>
        </Link>

        <a
          href="https://github.com/CubingSoda/personal-website"
          target="_blank"
          rel="noreferrer"
          className={styles.repoLink}
        >
          <img src="/img/icons/github.png" alt="Github Icon" />
          <span>Source Code</span>
        </a>
      </section>
    </div>
  );
};

export default RegularNav;
