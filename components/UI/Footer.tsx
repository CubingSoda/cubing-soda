import styles from "styles/components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer1}>
        <img
          src="/img/icons/site.png"
          alt="Site Icon"
          className={styles.siteIcon}
        />
        <span>CubingSoda </span>
      </div>
      <div className={styles.footer2}>
        <span>Copyright &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
