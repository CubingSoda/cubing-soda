import UI from "components/UI";
import styles from "styles/NotFound.module.scss";

export default function NotFound() {
  return (
    <UI page="404" keywords={["404", "not found"]}>
      <main className={styles.notFound}>
        <div className={styles.title}>404</div>
        <div className={styles.paragraph}>
          Sorry, we couldn&apos;t find what you were looking for.
        </div>
      </main>
    </UI>
  );
}
