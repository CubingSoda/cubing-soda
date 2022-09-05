import { v4 as uuidv4 } from "uuid";

import styles from "styles/Blog.module.scss";

export default function TagSuggestions({ suggest, allTags, input, setInput }) {
  function click(tag) {
    if (input === "tag: ") {
      setInput(`tag: ${tag}`);
    } else {
      setInput(`${input}, ${tag}`);
    }
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
              setInput("tag: ");
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
