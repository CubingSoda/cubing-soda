import styles from "styles/components/NavBar.module.scss";

import Link from "next/link";

export default function RegularNav() {
  return (
    <div className={styles.regular}>
      <section className={styles.links}>
        <Link href="/">
          <a>Home</a>
        </Link>

        {/* <Link href="/blog">
          <a>Blog</a>
        </Link> */}
        <a href="/blog">Blog</a>

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
}
