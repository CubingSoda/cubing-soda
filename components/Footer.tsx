import styles from "styles/components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer1}>
        <img src="/favicons/icon.png" alt="Site Icon" className="site-icon" />
        <span>CubingSoda</span>
      </div>
      <div className={styles.footer2}>
        <span>Copyright &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
