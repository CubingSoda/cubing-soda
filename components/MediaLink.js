import styles from "styles/Home.module.scss";

export default function MediaLink({ name, img, href }) {
  return (
    <a href={href} rel="noreferrer" target="_blank" className={name}>
      <img src={img} alt={`${name}`} className={styles.logo} />
    </a>
  );
}
