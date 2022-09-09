import { v4 as uuidv4 } from "uuid";

import styles from "styles/Blog.module.scss";

export default function TagSuggestions({ suggest, allTags }) {
  const change = process.env.CHANGE;

  function click(tag) {
    change(`tag: ${tag}`);
  }

  return (
    <div>
      {suggest ? (
        <div className={`${styles.tagSuggestions} ${styles.tags}`}>
          {allTags.map((tag) => {
            return (
              <span
                className={styles.tag}
                key={uuidv4()}
                onClick={() => {
                  click(tag);
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      ) : (
        <div className={styles.tagHint}>
          Use{" "}
          <code
            onClick={() => {
              change("tag: ");
            }}
          >
            tag:
          </code>{" "}
          to search tags
        </div>
      )}
    </div>
  );
}
