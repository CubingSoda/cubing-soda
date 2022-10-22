import RegularNav from "./Nav";
import Ham from "./Ham";

import styles from "styles/components/NavBar.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <RegularNav />
      <Ham />
    </nav>
  );
}
