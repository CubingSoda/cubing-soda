import styles from "styles/components/NavBar.module.scss";

import RegularNav from "./Nav";
import Ham from "./Ham";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <RegularNav />
      <Ham />
    </nav>
  );
};

export default Nav;
